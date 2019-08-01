import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('scenarioDetails rendering', () => {
    describe('reactDOM', () => {
        it('should render without crashing', () => {
            const div = document.createElement('div');

            ReactDOM.render(<Component/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });

    describe('shallow without data', () => {
        let wrapper;

        beforeEach(() => wrapper = shallow(<Component/>));

        it('should render scenario-details', () => expect(wrapper.find('.scenario-details')).toHaveLength(1));
        it('should render scenario-status-and-name', () => expect(wrapper.find('.scenario-status-and-name')).toHaveLength(1));
        it('should render scenario-name', () => expect(wrapper.find('.scenario-name')).toHaveLength(1));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {
            scenario: {after: 0, steps: [], testsPassed: false, timeRate: 0}
        };

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render scenario-details', () => expect(wrapper.find('.scenario-details')).toHaveLength(1));
        it('should render scenario-status-and-name', () => expect(wrapper.find('.scenario-status-and-name')).toHaveLength(1));
        it('should render scenario-name', () => expect(wrapper.find('.scenario-name')).toHaveLength(1));
    });
});
