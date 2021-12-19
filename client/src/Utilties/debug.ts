export const isProduction = () =>{
    const _isProduction =  (process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase().includes('prod')))
        ? true
        : false;

    return _isProduction;
}

export const log = (x?:string) =>{

    const debug = !isProduction();
    if(!debug) return;

    if(!x) x = "Development environment";

    return console.log(x);
}