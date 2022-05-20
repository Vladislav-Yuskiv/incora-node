const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const { WrongParametersError} = require('../helpers/error')

module.exports = {
   
    userValidation: (req, res, next) => {
         const schema = Joi.object({
            first_name: Joi.string()
                          .min(5)
                          .max(80)
                          .required(),
            last_name: Joi.string()
                          .min(5)
                          .max(80)
                          .required(),
            email: Joi.string()
                        .min(5)
                        .max(80)
                        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                        .required(),
            phone: myCustomJoi.string()
                        .min(5)
                        .max(80)
                        .phoneNumber(),
            password: Joi.string()  
                        .min(5)
                        .max(15),
         });
        
        const validationResult =  schema.validate(req.body);

        if (validationResult.error) {
             next (new WrongParametersError('Wrong parametrs'))    
      }
  
        next()
    },
}