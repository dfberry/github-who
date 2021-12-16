export type logLevel = 'verbose' | 'error';

export const log = (level:logLevel='verbose', logMessage:string) =>{
    if (!process?.env?.PRODUCTION){
        console.log("Not production environment");

        if(level==='verbose'){
            console.log(logMessage);
        } else {
            console.error(logMessage);
        }
    }
}

export const isProduction = () => process.env.NODE_ENV.toLowerCase()==='production' ? true : false;