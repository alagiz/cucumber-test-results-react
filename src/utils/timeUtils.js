import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

class TimeUtils {
    static convertNanosecondsToTime(durationInNanoseconds) {
        this.checkIfInputIsANonNegativeNumber(durationInNanoseconds, "Duration");

        const durationInMilliseconds = Math.floor(durationInNanoseconds / 1000000);

        return moment.duration(durationInMilliseconds, 'milliseconds').format('h[h] m[m] s[s]', {
            trim: true
        });
    }

    static getWidthBasedOnTimeRate(timeRate) {
        this.checkIfInputIsANonNegativeNumber(timeRate, "Time rate");

        return `${timeRate * 30}vw`;
    }

    static checkIfInputIsANonNegativeNumber(input, inputId) {
        if (typeof input !== "number") {
            throw new Error(`${inputId} is not a number!`);
        }

        if (input < 0) {
            throw new Error(`${inputId} must be not negative!`);
        }
    }
}

export default TimeUtils;