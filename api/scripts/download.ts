import { getEnvironment, Environment } from '../shared/environment';
import { download } from '../shared/azure-storage';

export const downloadTestFiles = async() =>{

    
    const environment = getEnvironment();
    
 
    // download test files before running tests
    return await download(
        environment.appSettings.log,
        environment.testEnvironment.storageSettings,
        environment.testEnvironment.localTestFilesDirectory,
    );

}



