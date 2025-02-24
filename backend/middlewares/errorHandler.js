// export const handleValidationError =(message, statusCode)=>{
//     const error=new Error(message);
//     error.statusCode=statusCode;
//     throw error;
    
// };
// export const errorHandler=(err,req,res,next)=>{
//     const statusCode=err.statusCode || 500;
//     const message=err.message|| "internal server error";
//     res.status(statusCode).json({success:false,message})
// };

export const handleValidationError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  };
  
  export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  