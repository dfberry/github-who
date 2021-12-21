export const log = (x?:string) =>{

    if(!(process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase().includes('prod')))) return;

    if(!x) x = "Development environment";

    return console.log(x);
}