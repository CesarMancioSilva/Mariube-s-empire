// import ErrorHandler from "./erro";
// import jwt from 'jsonwebtoken'
// export const verifyToken = (req,res,next)=>{
//     const token = req.cookies.access_token;
//     if(!token) return next(ErrorHandler(401,'Unauthorized'));
//     jwt.verify(token,process.env.JWT_SECRET,(err,user=>{
//         if(err) return next(ErrorHandler(403,'Forbidden'))
//     }))
// }