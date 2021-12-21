export const requestStatusFromApi = async (): Promise<any> => {
    try {

        const uri = `/api/status`;

        console.log(uri);

        // Azure Function API
        const response: any = await fetch(uri, {
            method: "GET",
            headers: {
                "Accept": 'application/json',
                "content-type": "application/json",
            }
        });
        const responseJSON = await response.json();
        console.log(responseJSON);

        return responseJSON;
    } catch (err) {
        console.log(err);
        throw (err);
    }

}