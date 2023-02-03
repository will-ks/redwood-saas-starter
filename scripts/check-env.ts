import apiConfig from 'api/src/lib/config'
import webConfig from 'web/src/lib/config'
// Confirm environment variables exist before deploying

export default async () => {
  console.log('Webconfig fine', Boolean(webConfig))
  console.log('Apiconfig fine', Boolean(apiConfig))
}
