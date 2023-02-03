/* eslint-disable unicorn/no-process-exit */
import express from 'express'
import { getWorker } from './helpers/worker-helpers'

const addGlobalExitHandler = (
  callback: (eventOrExitCodeOrError?: number | string | Error) => void
) => {
  let exiting = false
  ;[
    'beforeExit',
    'uncaughtException',
    'unhandledRejection',
    'SIGHUP',
    'SIGINT',
    'SIGQUIT',
    'SIGILL',
    'SIGTRAP',
    'SIGABRT',
    'SIGBUS',
    'SIGFPE',
    'SIGUSR1',
    'SIGSEGV',
    'SIGUSR2',
    'SIGTERM',
  ].forEach((event) =>
    process.on(event, (eventOrExitCodeOrError?: number | string | Error) => {
      if (exiting) {
        return
      }
      exiting = true
      callback(eventOrExitCodeOrError)
    })
  )
}
const onExitCallbacks: (() => Promise<void>)[] = []
const exit = async (exitCode?: number) => {
  console.log('Cleaning up, please wait...')
  await Promise.allSettled(
    onExitCallbacks.map(async (callback) => {
      try {
        await callback()
      } catch (error) {
        console.error(error)
      }
    })
  )
  process.exit(exitCode)
}
addGlobalExitHandler((eventOrExitCodeOrError) => {
  console.log(
    eventOrExitCodeOrError instanceof Error
      ? `Exiting due to error: ${eventOrExitCodeOrError}`
      : 'Exiting...'
  )
  exit(
    typeof eventOrExitCodeOrError === 'number' &&
      !Number.isNaN(eventOrExitCodeOrError)
      ? eventOrExitCodeOrError
      : undefined
  ).catch((error) => console.error(error))
})

const app = express()

;(async () => {
  const worker = await getWorker({})
  app.get('/status', (req, res) => {
    res.send(worker.getState())
  })
  app.listen(3001)
  onExitCallbacks.push(async () => {
    console.log(`Shutting down worker...`)
    await worker.shutdown()
    console.log('Worker shut down.')
  })
  await worker.run()
})()
