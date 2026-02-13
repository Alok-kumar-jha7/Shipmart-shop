class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}

export const errorMiddleware =(err,req,res,next)=>{

    if(err.name === "CastError"){
        err = new ErrorHandler(`Invalid: ${err.path}`,400);
    }

    if(err.name === "TokenExpiredError"){
        err = new ErrorHandler("JSON web token is expired,Please login again.",400);
    }

    if(err.name === "JsonWebTokenError"){
        err = new ErrorHandler("JSON web token is invalid,Please try again.",400);
    }

    if(err.code === 11000){
        err = new ErrorHandler(`Duplicate ${Object.keys(err.keyValue)} entered`,400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
          .map(val => val.message)
          .join(", ");
        err = new ErrorHandler(message, 400);
    }

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};

export default ErrorHandler;