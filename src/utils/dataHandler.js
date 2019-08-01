import {clone, filter, juxt, max} from 'ramda';

const filterKeyMap = {
    passed: feature => feature.testsPassed === true,
    failed: feature => feature.testsPassed === false,
    all: feature => feature
};

class DataHandler {
    static getHeaderData(features) {
        const overallDuration = features.reduce((prev, feature) => feature.duration + prev, 0);
        const featuresNumber = features.length;
        const numberOfPassedFeatures = features.filter(feature => feature.testsPassed).length;

        return {
            overallDuration: overallDuration,
            featuresNumber: featuresNumber,
            numberOfPassedFeatures: numberOfPassedFeatures
        };
    }

    static setDurationPerFeature() {
        const getFeatureDuration = elements => elements.reduce((prev, element) => prev + this.sumDuration()(element.steps), 0);
        const setFeatureDuration = feature => feature.duration = getFeatureDuration(feature.elements);

        return features => features.map(feature => setFeatureDuration(feature));
    }

    static setResultPerFeature() {
        const getFeatureResult = elements => elements.reduce((prev, element) => prev && this.getTestsPassedPerScenario()(element.steps), true);
        const setFeatureResult = feature => feature.testsPassed = getFeatureResult(feature.elements);

        return features => features.map(feature => setFeatureResult(feature));
    }

    static getTestsPassed() {
        return step => step.result ? step.result.status ? step.result.status === 'passed' : false : false;
    }

    static getTestsPassedPerScenario() {
        const andTestsPassedIfExists = (prev, step) => this.getTestsPassed()(step) && prev;

        return steps => steps.reduce((prev, step) => andTestsPassedIfExists(prev, step), true);
    }

    static sumDuration() {
        const getDuration = step => step.result ? step.result.duration ? step.result.duration : 0 : 0;
        const addDurationIfExists = (prev, step) => getDuration(step) + prev;

        return steps => steps.reduce((prev, step) => addDurationIfExists(prev, step), 0);
    }

    static setDurationPerScenarioPerFeature() {
        const setScenarioDuration = element => element.duration = this.sumDuration()(element.steps);
        const setDurationPerScenario = feature => feature.elements.map(element => setScenarioDuration(element));

        return features => features.map(feature => setDurationPerScenario(feature));
    }

    static setResultPerScenarioPerFeature() {
        const setScenarioResult = element => element.testsPassed = this.getTestsPassedPerScenario()(element.steps);
        const setResultPerScenario = feature => feature.elements.map(element => setScenarioResult(element));

        return features => features.map(feature => setResultPerScenario(feature));
    }

    static setScenariosNumberPerFeature() {
        const setFeatureScenariosNumber = feature => feature.scenariosNumber = feature.elements.length;

        return features => features.map(feature => setFeatureScenariosNumber(feature));
    }

    static setFailedScenarioPerFeature() {
        const setFeatureFailedScenario = feature => {
            const firstFailedScenario = feature.elements.find(scenario => !scenario.testsPassed);
            const firstFailedStep = firstFailedScenario ? firstFailedScenario.steps.find(step => !step.testsPassed) : null;

            if (firstFailedScenario && firstFailedStep) {
                feature.firstFailedScenario = firstFailedScenario;
                feature.firstFailedStep = firstFailedStep;
            }
        };

        return features => features.map(feature => setFeatureFailedScenario(feature));
    }

    static setDurationPerStepPerScenarioPerFeature() {
        const setDurationPerStep = element => element.steps.map(step => step.duration = step.result ? step.result.duration || 0 : 0);
        const setDurationPerStepPerScenario = feature => feature.elements.map(element => setDurationPerStep(element));

        return features => features.map(feature => setDurationPerStepPerScenario(feature));
    }

    static setResultPerStepPerScenarioPerFeature() {
        const setResultPerStep = element => element.steps.map(step => step.testsPassed = this.getTestsPassed()(step));
        const setResultPerStepPerScenario = feature => feature.elements.map(element => setResultPerStep(element));

        return features => features.map(feature => setResultPerStepPerScenario(feature));
    }

    static setStatusPerStepPerScenarioPerFeature() {
        const getStatus = step => step.result ? step.result.status ? step.result.status : 'failed' : 'failed';
        const setStatusPerStep = element => element.steps.map(step => step.status = getStatus(step));
        const setStatusPerStepPerScenario = feature => feature.elements.map(element => setStatusPerStep(element));

        return features => features.map(feature => setStatusPerStepPerScenario(feature));
    }

    static setMaxScenarioTimePerFeature() {
        const getMaxScenarioTime = elements => max(...elements.map(element => element.duration));

        return features => features.map(feature => feature.maxScenarioTime = getMaxScenarioTime(feature.elements));
    }

    static setTimeRatePerScenarioPerFeature() {
        const setScenarioTimeRate = (element, feature) => element.timeRate = element.duration / feature.maxScenarioTime;
        const setTimeRatePerScenario = feature => feature.elements.map(element => setScenarioTimeRate(element, feature));

        return features => features.map(feature => setTimeRatePerScenario(feature));
    }

    static setTimeRatePerStepPerScenarioPerFeature() {
        const setStepTimeRate = (steps, maxTime) => steps.map(step => step.timeRate = step.duration / maxTime);
        const setTimeRatePerStep = (elements, maxTime) => elements.map(element => setStepTimeRate(element.steps, maxTime));
        const setTimeRatePerStepPerScenario = feature => setTimeRatePerStep(feature.elements, feature.maxScenarioTime);

        return features => features.map(feature => setTimeRatePerStepPerScenario(feature));
    }

    static addRelevantInformation(features) {
        const featuresClone = clone(features);
        const modifications = [
            this.setDurationPerFeature(),
            this.setResultPerFeature(),
            this.setDurationPerScenarioPerFeature(),
            this.setResultPerScenarioPerFeature(),
            this.setScenariosNumberPerFeature(),
            this.setDurationPerStepPerScenarioPerFeature(),
            this.setResultPerStepPerScenarioPerFeature(),
            this.setStatusPerStepPerScenarioPerFeature(),
            this.setMaxScenarioTimePerFeature(),
            this.setTimeRatePerScenarioPerFeature(),
            this.setTimeRatePerStepPerScenarioPerFeature(),
            this.setFailedScenarioPerFeature()
        ];

        juxt(modifications)(featuresClone);

        return featuresClone;
    }

    static filterData(features, filterKey) {
        return filter(filterKeyMap[filterKey], features);
    }
}

export default DataHandler;