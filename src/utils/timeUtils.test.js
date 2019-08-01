import Component from './timeUtils';

describe('time utils', () => {
    describe('convert nanoseconds to time', () => {
        it('should convert nanoseconds to time if a positive number passed in', () => {
            const convertedTime = Component.convertNanosecondsToTime(100000000000);

            expect(convertedTime).toEqual('1m 40s');
        });

        it('should convert nanoseconds to time if zero is passed in', () => {
            const convertedTime = Component.convertNanosecondsToTime(0);

            expect(convertedTime).toEqual('0s');
        });

        it('should throw an exception if a negative number is passed in', () => {
            const convertToTimeWrongInput = () => Component.convertNanosecondsToTime(-1);

            expect(convertToTimeWrongInput).toThrowError(/^Duration must be not negative!$/);
        });

        it('should throw an exception if wrong type is passed in', () => {
            const convertToTimeWrongInput = () => Component.convertNanosecondsToTime('notANumber');

            expect(convertToTimeWrongInput).toThrowError(/^Duration is not a number!$/);
        });
    });

    describe('get width based on time rate', () => {
        it('should get width based on time rate if positive number is passed in', () => {
            const convertedTime = Component.getWidthBasedOnTimeRate(10);

            expect(convertedTime).toEqual('300vw');
        });

        it('should get width based on time rate if zero is passed in', () => {
            const convertedTime = Component.getWidthBasedOnTimeRate(0);

            expect(convertedTime).toEqual('0vw');
        });

        it('should throw an exception if a negative number is passed in', () => {
            const convertToTimeWrongInput = () => Component.getWidthBasedOnTimeRate(-1);

            expect(convertToTimeWrongInput).toThrowError(/^Time rate must be not negative!$/);
        });

        it('should throw an exception if wrong type is passed in', () => {
            const convertToTimeWrongInput = () => Component.getWidthBasedOnTimeRate('notANumber');

            expect(convertToTimeWrongInput).toThrowError(/^Time rate is not a number!$/);
        });
    });

    describe('check if input is a non negative number', () => {
        it('should not throw an error if a positive number is passed in', () => {
            const convertToTimeCorrectInput = () => Component.checkIfInputIsANonNegativeNumber(1);

            expect(convertToTimeCorrectInput).not.toThrowError('Error!');
        });

        it('should not throw an error if zero is passed in', () => {
            const convertToTimeCorrectInput = () => Component.checkIfInputIsANonNegativeNumber(0);

            expect(convertToTimeCorrectInput).not.toThrowError('Error!');
        });

        it('should throw an exception if a negative number is passed in', () => {
            const convertToTimeWrongInput = () => Component.checkIfInputIsANonNegativeNumber(-1, 'Negative1');

            expect(convertToTimeWrongInput).toThrowError(/^Negative1 must be not negative!$/);
        });

        it('should throw an exception if wrong type is passed in', () => {
            const convertToTimeWrongInputString = () => Component.checkIfInputIsANonNegativeNumber('notANumber', 'StringProp');
            const convertToTimeWrongInputArray = () => Component.checkIfInputIsANonNegativeNumber([1], 'StringProp');
            const convertToTimeWrongInputObject = () => Component.checkIfInputIsANonNegativeNumber({prop: 0}, 'StringProp');
            const convertToTimeWrongInputFunction = () => Component.checkIfInputIsANonNegativeNumber(() => true, 'StringProp');
            const convertToTimeWrongInputNull = () => Component.checkIfInputIsANonNegativeNumber(null, 'StringProp');

            expect(convertToTimeWrongInputString).toThrowError(/^StringProp is not a number!$/);
            expect(convertToTimeWrongInputArray).toThrowError(/^StringProp is not a number!$/);
            expect(convertToTimeWrongInputObject).toThrowError(/^StringProp is not a number!$/);
            expect(convertToTimeWrongInputFunction).toThrowError(/^StringProp is not a number!$/);
            expect(convertToTimeWrongInputNull).toThrowError(/^StringProp is not a number!$/);
        });
    });
});
