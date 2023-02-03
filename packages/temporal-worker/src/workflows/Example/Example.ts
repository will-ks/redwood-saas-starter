import {
  defineQuery,
  defineSignal,
  proxyActivities,
  setHandler,
} from '@temporalio/workflow'
import { LedgerErrorCode } from 'ledger-sdk'
import {
  ExampleWorkflowStatus,
  TemporalQueryName,
  TemporalWorkflowSignalName,
} from 'shared-data/src'
import type * as activities from '../../activities'

const exampleSignal = defineSignal(TemporalWorkflowSignalName.Example)
export const getStatusQuery = defineQuery<ExampleWorkflowStatus>(
  TemporalQueryName.GetStatus
)

const { transferTokensBetweenUsers } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    nonRetryableErrorTypes: [LedgerErrorCode.InsufficientFunds],
  },
})

export async function Example() {
  let workflowStatus = ExampleWorkflowStatus.Initializing
  try {
    setHandler(getStatusQuery, () => workflowStatus)
    await transferTokensBetweenUsers({
      fromUserId: '',
      tokensQuantity: 10,
      toUserId: '',
    })
    setHandler(exampleSignal, () => {})
  } finally {
    workflowStatus = ExampleWorkflowStatus.Ending
  }
}
