const AJV = require('ajv');
const ajv = new AJV({ allErrors: true });
const { cloneDeep } = require('lodash')

const { backScrachter } = require('../schema/back-scratcher');

const updateBackScratcher = cloneDeep(backScrachter)
delete updateBackScratcher.required;

  class Validator {
    constructor() {
      ajv.addKeyword('isNotEmpty', {
        keyword: 'isNotEmpty',
        type: ['array', 'string'],
        validate: (schema, data) => {
          let isValid = true;
          if (typeof data === 'string') {
            isValid = data.trim !== ''
          } else {
            isValid = data.length !== 0;
          }
          return isValid;
        },
        errors: false
      });
      
    }

    validate(schema, request) {
      const Validator = ajv.compile(schema);
      const isValid = Validator(request)
      const errors = Validator.errors;
      return {isValid, errors};
    }

    validateNewBackScratcher(request) {
      return this.validate(backScrachter, request);
    }

    validateUpdateBackScratcher(request) {
      return this.validate(updateBackScratcher, request);
    }
  }

  module.exports = new Validator();