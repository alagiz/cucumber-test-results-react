import Ajv from 'ajv';

const ajv = new Ajv({allErrors: true});

class Validator {
    static getValidationFunction(schema) {
        let validationFunction;

        try {
            validationFunction = ajv.compile(schema);
        } catch (e) {
            throw new Error(`Ajv failed to compile schema with the following error: ${e.message}`);
        }

        return validationFunction;
    }
}

export default Validator;