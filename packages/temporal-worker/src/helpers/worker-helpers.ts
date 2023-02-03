import { NativeConnection, Worker } from '@temporalio/worker'
import { TEMPORAL_TASK_QUEUE_NAME } from 'shared-data/src'
import * as activities from '../activities'

export const getWorker = ({
  connection,
}: {
  connection?: NativeConnection
}) => {
  return Worker.create({
    workflowsPath: require.resolve('../workflows'), // passed to Webpack for bundling
    activities, // directly imported in Node.js
    taskQueue: TEMPORAL_TASK_QUEUE_NAME,
    connection,
  })
}
