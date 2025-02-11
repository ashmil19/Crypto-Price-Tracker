import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    origin: true
}