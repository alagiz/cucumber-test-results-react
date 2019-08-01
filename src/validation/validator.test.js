import Component from './validator';
import correctSchema from './validator.testSchemaCorrect';
import incorrectSchema from './validator.testSchemaIncorrect';

describe('validator', () => {
    describe('getValidationFunction returns a function', () => {
        it('should return a function when correct schema passed in', () => {
            const validationFunction = Component.getValidationFunction(correctSchema);

            expect(typeof validationFunction).toBe('function');
        });

        it('should return a function when correct schema passed in', () => {
            const getValidationFunction = () => Component.getValidationFunction(incorrectSchema);

            expect(getValidationFunction).toThrowError(/^Ajv failed to compile schema with the following error.*$/);
        });

    });
});
