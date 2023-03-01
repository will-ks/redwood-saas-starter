import { WorkflowNotFoundError } from '@temporalio/client'
import { doWithRetriesAndTimeout } from '@will-ks/helpers'
import axios from 'axios'
import execa, { ExecaChildProcess } from 'execa'
import { ExampleWorkflowStatus, TemporalWorkflowName } from 'shared-data/src'
import { temporal } from 'src/lib/apis/temporal/temporal'

jest.setTimeout(20_000)

let worker: ExecaChildProcess | undefined

const stopTestDependencies = async () => {
  if (worker) {
    // Kill worker
    worker.kill('SIGTERM', {
      forceKillAfterTimeout: 2000,
    })
    // worker.kill is async but doesn't return a promise, so we must wait for worker to be killed
    await doWithRetriesAndTimeout(
      () => Promise.resolve(!worker || worker.killed),
      {
        getShouldRetryOnResult: (dead) => {
          if (!dead) {
            console.warn(`Worker not dead yet`)
            return true
          }
          return false
        },
        interval: 500,
        maxRetries: Number.POSITIVE_INFINITY,
        backoff: false,
        timeout: 10_000,
        timeoutMessage: 'Timed out waiting for worker to be killed',
      }
    )
  }
  await execa('yarn', ['workspace', 'temporal-cluster', 'stop:test'])
}

const startTestDependencies = async () => {
  // Start temporal cluster
  await execa('yarn', ['workspace', 'temporal-cluster', 'start:test'])
  // Start temporal worker
  worker = execa('yarn', ['workspace', 'temporal-worker', 'start']) // Start worker
  console.log('worker spawned')
  await doWithRetriesAndTimeout(
    // Check worker is alive
    async () => {
      const response = await axios.get<
        | 'INITIALIZED'
        | 'RUNNING'
        | 'STOPPED'
        | 'STOPPING'
        | 'DRAINING'
        | 'DRAINED'
        | 'FAILED'
      >('http://localhost:3001/status')
      console.log(response.data)
      return response.data
    },
    {
      getShouldRetryOnResult: (state) => {
        if (state !== 'RUNNING') {
          console.warn(`Worker not ready yet, state: ${state}`)
          return true
        }
        return false
      },
      getShouldRetryOnError: (error) => {
        console.warn(error)
        return true
      },
      interval: 500,
      maxRetries: Number.POSITIVE_INFINITY,
      backoff: false,
      timeout: 10_000,
      timeoutMessage: 'Timed out waiting for worker to be ready',
    }
  )
  console.log('Worker running')
}

const userId = 'newuser'
const user2Id = 'seconduser'
const id = 'exampleId'
const roomProviderId = 'roomId'

describe.skip('temporal-api', () => {
  beforeEach(async () => {
    await stopTestDependencies()
    await startTestDependencies()
  })
  afterAll(async () => {
    await stopTestDependencies()
  })

  describe('Example Workflow', () => {
    test('starts successfully', async () => {
      await expect(
        temporal.getWorkflowExecutionStatus({
          workflowType: TemporalWorkflowName.Example,
          id,
        })
      ).rejects.toThrow(WorkflowNotFoundError)
      await temporal.startExampleWorkflow({
        id,
      })
      await expect(
        temporal.getWorkflowExecutionStatus({
          workflowType: TemporalWorkflowName.Example,
          id,
        })
      ).resolves.toStrictEqual({
        code: 1,
        name: 'RUNNING',
      })
      await expect(
        temporal.getWorkflowStatus({
          workflowType: TemporalWorkflowName.Example,
          id,
        })
      ).resolves.toBe(ExampleWorkflowStatus.Initializing)
    })
  })
})
