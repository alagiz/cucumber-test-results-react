import Component from './dataHandler';
import testData from './dataHandler.testData';
import {clone} from 'ramda';

describe('data handler', () => {
    let features;

    beforeEach(() => {
        features = clone(testData);
    });

    describe('"public" functions', () => {
        it('addRelevantInformation should add relevant information', () => {
            const updatedFeatures = Component.addRelevantInformation(features);
            const feature0 = updatedFeatures.shift();
            const feature0Scenario0 = feature0.elements.shift();
            const feature0Scenario0Step0 = feature0Scenario0.steps.shift();
            const feature0Scenario0Step1 = feature0Scenario0.steps.shift();

            expect(feature0.duration).toEqual(53);
            expect(feature0.testsPassed).toEqual(false);
            expect(feature0.maxScenarioTime).toEqual(50);
            expect(feature0.scenariosNumber).toEqual(2);
            expect(feature0Scenario0.duration).toEqual(3);
            expect(feature0Scenario0.testsPassed).toEqual(false);
            expect(feature0Scenario0.timeRate).toEqual(0.06);
            expect(feature0Scenario0Step0.testsPassed).toEqual(true);
            expect(feature0Scenario0Step0.timeRate).toEqual(0.02);
            expect(feature0Scenario0Step0.duration).toEqual(1);
            expect(feature0Scenario0Step0.status).toEqual('passed');
            expect(feature0Scenario0Step1.testsPassed).toEqual(false);
            expect(feature0Scenario0Step1.timeRate).toEqual(0);
            expect(feature0Scenario0Step1.duration).toEqual(0);
            expect(feature0Scenario0Step1.status).toEqual('skipped');
        });

        it('filterData should filter data', () => {
            Component.setResultPerFeature()(features);

            const passedFeatures = Component.filterData(features, 'passed');
            const failedFeatures = Component.filterData(features, 'failed');
            const allFeatures = Component.filterData(features, 'all');

            expect(passedFeatures.length).toEqual(1);
            expect(failedFeatures.length).toEqual(4);
            expect(allFeatures.length).toEqual(5);
        });

        it('getHeaderData should get headerData', () => {
            const updatedFeatures = Component.addRelevantInformation(features);
            const headerData = Component.getHeaderData(updatedFeatures);

            expect(headerData.featuresNumber).toEqual(5);
            expect(headerData.overallDuration).toEqual(151);
            expect(headerData.numberOfPassedFeatures).toEqual(1);
        });
    });

    describe('"private" functions', () => {
        it('setDurationPerFeature should update features with correct duration', () => {
            Component.setDurationPerFeature()(features);

            expect(features.length).toEqual(5);
            expect(features.shift().duration).toEqual(53);
            expect(features.shift().duration).toEqual(34);
            expect(features.shift().duration).toEqual(0);
        });

        it('setResultPerFeature should update features with correct result', () => {
            Component.setResultPerFeature()(features);

            expect(features.length).toEqual(5);
            expect(features.pop().testsPassed).toEqual(true);
            expect(features.pop().testsPassed).toEqual(false);
        });

        it('getTestsPassed should get correct result', () => {
            const passedStep = {result: {status: 'passed'}};
            const failedStep = {result: {status: 'failed'}};
            const skippedStep = {result: {status: 'failed'}};
            const stepNoStatus = {result: null};
            const stepNoResult = {};

            const getTestsPassed = Component.getTestsPassed();

            expect(getTestsPassed(passedStep)).toEqual(true);
            expect(getTestsPassed(failedStep)).toEqual(false);
            expect(getTestsPassed(skippedStep)).toEqual(false);
            expect(getTestsPassed(stepNoStatus)).toEqual(false);
            expect(getTestsPassed(stepNoResult)).toEqual(false);
        });

        it('getTestsPassedPerScenario should get correct result', () => {
            const passedSteps = features.pop().elements.pop().steps;
            const failedSteps = features.shift().elements.shift().steps;

            const getTestsPassedPerScenario = Component.getTestsPassedPerScenario();

            expect(getTestsPassedPerScenario(passedSteps)).toEqual(true);
            expect(getTestsPassedPerScenario(failedSteps)).toEqual(false);
        });

        it('sumDuration should sum duration, innit?', () => {
            const stepsWithDuration26s = features.pop().elements.pop().steps;
            const stepsWithDuration3s = features.shift().elements.shift().steps;
            const stepsNoDuration = [{result: null}];
            const stepsNoResult = [{}];

            const sumDuration = Component.sumDuration();

            expect(sumDuration(stepsWithDuration26s)).toEqual(26);
            expect(sumDuration(stepsWithDuration3s)).toEqual(3);
            expect(sumDuration(stepsNoDuration)).toEqual(0);
            expect(sumDuration(stepsNoResult)).toEqual(0);
        });

        it('setDurationPerScenarioPerFeature should set correct duration', () => {
            Component.setDurationPerScenarioPerFeature()(features);

            const feature0 = features.pop();
            const scenarioWithDuration26s = feature0.elements.pop();
            const scenarioWithDuration24s = feature0.elements.pop();

            expect(scenarioWithDuration26s.duration).toEqual(26);
            expect(scenarioWithDuration24s.duration).toEqual(24);
        });

        it('setResultPerScenarioPerFeature should set correct duration', () => {
            Component.setResultPerScenarioPerFeature()(features);

            const scenarioWithResultFailed = features.shift().elements.pop();
            const scenarioWithResultPassed = features.pop().elements.pop();

            expect(scenarioWithResultFailed.testsPassed).toEqual(false);
            expect(scenarioWithResultPassed.testsPassed).toEqual(true);
        });

        it('setScenariosNumberPerFeature should set correct scenarios number', () => {
            Component.setScenariosNumberPerFeature()(features);

            const featureWith4 = features.pop();
            const featureWith5 = features.pop();

            expect(featureWith4.scenariosNumber).toEqual(2);
            expect(featureWith5.scenariosNumber).toEqual(1);
        });

        it('setDurationPerStepPerScenarioPerFeature should set correct duration', () => {
            Component.setDurationPerStepPerScenarioPerFeature()(features);

            const stepWithDuration24 = features.pop().elements.pop().steps.pop();
            const stepWithDuration14 = features.pop().elements.pop().steps.pop();

            expect(stepWithDuration24.duration).toEqual(24);
            expect(stepWithDuration14.duration).toEqual(14);
        });

        it('setResultPerStepPerScenarioPerFeature should set correct result', () => {
            Component.setResultPerStepPerScenarioPerFeature()(features);

            const passedStep = features.pop().elements.pop().steps.pop();
            const failedStep = features.shift().elements.pop().steps.pop();

            expect(passedStep.testsPassed).toEqual(true);
            expect(failedStep.testsPassed).toEqual(false);
        });

        it('setStatusPerStepPerScenarioPerFeature should set correct status', () => {
            Component.setStatusPerStepPerScenarioPerFeature()(features);

            const passedStep = features.pop().elements.pop().steps.pop();
            const failedStep = features.shift().elements.shift().steps.pop();
            const skippedStep = features.pop().elements.pop().steps.pop();
            const incompleteSteps = features.pop().elements.pop().steps;
            const stepNoStatus = incompleteSteps.pop();
            const stepNoResult = incompleteSteps.pop();

            expect(passedStep.status).toEqual('passed');
            expect(failedStep.status).toEqual('failed');
            expect(skippedStep.status).toEqual('skipped');
            expect(stepNoStatus.status).toEqual('failed');
            expect(stepNoResult.status).toEqual('failed');
        });

        it('setMaxScenarioTimePerFeature should set correct max scenario time', () => {
            Component.setDurationPerScenarioPerFeature()(features);
            Component.setMaxScenarioTimePerFeature()(features);

            const featureWithMaxScenarioTime26s = features.pop();
            const featureWithMaxScenarioTime33s = features.shift();

            expect(featureWithMaxScenarioTime26s.maxScenarioTime).toEqual(26);
            expect(featureWithMaxScenarioTime33s.maxScenarioTime).toEqual(50);
        });

        it('setTimeRatePerScenarioPerFeature should set correct time rate per scenario', () => {
            Component.setDurationPerScenarioPerFeature()(features);
            Component.setMaxScenarioTimePerFeature()(features);
            Component.setTimeRatePerScenarioPerFeature()(features);

            const scenarioWithTimeRate1 = features.pop().elements.pop();
            const scenarioWithTimeRate006 = features.shift().elements.shift();

            expect(scenarioWithTimeRate1.timeRate).toEqual(1);
            expect(scenarioWithTimeRate006.timeRate).toEqual(0.06);
        });

        it('setTimeRatePerStepPerScenarioPerFeature should set correct time rate per step', () => {
            Component.setDurationPerScenarioPerFeature()(features);
            Component.setMaxScenarioTimePerFeature()(features);
            Component.setDurationPerStepPerScenarioPerFeature()(features);
            Component.setTimeRatePerStepPerScenarioPerFeature()(features);

            const stepWithTimeRate004 = features.shift().elements.shift().steps.pop();
            const stepWithTimeRate0 = features.shift().elements.shift().steps.pop();

            expect(stepWithTimeRate004.timeRate).toEqual(0.04);
            expect(stepWithTimeRate0.timeRate).toEqual(0);
        });
    });
});
