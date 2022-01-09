import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getEnvironment  } from '../shared/environment';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {

    const environment = getEnvironment(context.log);
    environment.appSettings.log('*** Azure Function: /api/status');

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: process.env
    };
  } catch (err) {
    const returnError = {
      error: JSON.stringify(err)
    };

    context.res = {
      status: 500 /* Defaults to 200 */,
      body: returnError
    };
  }
};

export default httpTrigger;
