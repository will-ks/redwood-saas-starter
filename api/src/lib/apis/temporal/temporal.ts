import pipeNow from '@arrows/composition/pipeNow'
import { WorkflowClient } from '@temporalio/client'
import {
  ExampleWorkflowStatus,
  TEMPORAL_TASK_QUEUE_NAME,
  TemporalQueryName,
  TemporalWorkflowName,
  TemporalWorkflowSignalName,
} from 'shared-data/src'

export const temporal = pipeNow(
  new WorkflowClient(),
  (client) =>
    class {
      private static getWorkflowId({
        workflowType,
        id,
      }: {
        workflowType: TemporalWorkflowName
        id: string
      }) {
        switch (workflowType) {
          case TemporalWorkflowName.Example:
            return `example-${id}`
        }
      }

      static startExampleWorkflow({ id }: { id: string }) {
        return client.start(TemporalWorkflowName.Example, {
          workflowId: this.getWorkflowId({
            workflowType: TemporalWorkflowName.Example,
            id,
          }),
          taskQueue: TEMPORAL_TASK_QUEUE_NAME,
          args: [],
        })
      }

      static signalExample({ id }: { id: string }) {
        return client
          .getHandle(
            this.getWorkflowId({
              workflowType: TemporalWorkflowName.Example,
              id,
            })
          )
          .signal(TemporalWorkflowSignalName.Example)
      }

      static async getWorkflowExecutionStatus({
        workflowType,
        id,
      }: {
        workflowType: TemporalWorkflowName
        id: string
      }) {
        return (
          await client
            .getHandle(
              this.getWorkflowId({
                workflowType,
                id,
              })
            )
            .describe()
        ).status
      }

      static async getWorkflowStatus({
        workflowType,
        id,
      }: {
        workflowType: TemporalWorkflowName
        id: string
      }) {
        return client
          .getHandle(
            this.getWorkflowId({
              workflowType,
              id,
            })
          )
          .query<
            typeof workflowType extends TemporalWorkflowName.Example
              ? ExampleWorkflowStatus
              : undefined
          >(TemporalQueryName.GetStatus)
      }
    }
)
