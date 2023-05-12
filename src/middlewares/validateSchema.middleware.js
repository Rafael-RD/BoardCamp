
export function validationMiddleware(schema){
    return(req, res, next)=>{
        const validationLog=schema.validate(req.body,{abortEarly: false});
        if(validationLog.error) return res.sendStatus(400);
        res.locals.validated=validationLog.value;
        next();
    }
}