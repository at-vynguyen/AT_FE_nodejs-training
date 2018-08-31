const Joi = require('Joi');

const passwordValidation = Joi.extend({
  base: Joi.string(),
  name: 'string',
  language: {
    errorMsg: 'Password must not have username'
  },
  rules: [{
    name: 'customPassword',
    validate(params, value, state, options) {
      if(state.parent.names) {
        if(value.includes(state.parent.names)) {
          return this.createError('string.errorMsg', {}, state, options);
        } else {
          return value;
        }
      }
      return this.createError('string.errorMsg', {}, state, options);
    }
  }],
});

const ageValidation = Joi.extend({
  base: Joi.string(),
  name: 'string',
  language: {
    errorMsg: 'age invalid'
  },
  rules: [{
    name: 'customAge',
    validate(params, value, state, options) {
    
    }
  }]
})

module.exports = {
  register: {
    body: {
      ages: Joi.number().min(18).max(50).options({
        language: {
          number: { 
            base: 'age must be a number2123123',
            min: 'age must >= 18',
            max: 'age must <= 50'
          }
        }
      }),
      passwords: passwordValidation.string().customPassword().options({
        language: {
          string: { base: 'password must be a string' }
        }
      }),
    }
  }
};
