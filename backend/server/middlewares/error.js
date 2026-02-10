class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}

export const errorMiddleware =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;

    err.message = err.message || "Internal Server Error";
    if(err.name === "CastError"){
        const message = `Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    if(err.name === "TokenExpiredError"){
        const message = "JSON web token is expired,Please login again.";
        err = new ErrorHandler(message,400);
    }
    if(err.name === "JsonWebTokenError"){
        const message = "JSON web token is invalid,Please try again.";
        err = new ErrorHandler(message,400);
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }
      if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ");
    err = new ErrorHandler(message, 400);
  }
    return res.status(err.statusCode).json({
        success: false,
        message : err.message || "Internal Server Error"
    })
}

export default ErrorHandler;