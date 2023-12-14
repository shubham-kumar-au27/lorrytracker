import {body, validationResult} from 'express-validator'

export const validate = (validations)=>{
    return async (req,res,next)=>{
        for (let validation of validations ){
            const result = await  validation.run(req)

            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req)   

        if(errors.isEmpty()){
            return next();
        }

        return res.status(402).json({
            errors:errors.array()
        })
    }
}


export const signupValidator = [
    body("name").notEmpty().withMessage("Name Is Required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("phoneNumber").trim().isLength({min:10} ,{max:10}).withMessage("Mobile number must be in valid"),
    body("password").trim().isLength({min:6}).withMessage("Password should contain at least 6 characters")
]



// module.exports = {
//     validate,
//     // loginValidator,
//     signupValidator,
//   };