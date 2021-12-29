import { Environment } from '../features/environment/environmentModel';

export const requestStatusFromApi = async (environment: Environment): Promise<any> => {
    try {

        const uri = `/api/status?code=${encodeURIComponent(environment.azureFunctionHostKey)}`;

        // Azure Function API
        const response: any = await fetch(uri, {
            method: "GET",
            headers: {
                "Accept": 'application/json',
                "content-type": "application/json",
            }
        });
        const responseJSON = await response.json();

        return responseJSON;
    } catch (err) {
        throw (err);
    }

}