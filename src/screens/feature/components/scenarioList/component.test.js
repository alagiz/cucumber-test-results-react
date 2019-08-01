import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('feature scenarioList rendering', () => {
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

        it('should render scenario-list-container', () => expect(wrapper.find('.scenario-list-container')).toHaveLength(1));
        it('should render scenario-list', () => expect(wrapper.find('.scenario-list')).toHaveLength(1));
        it('should render no scenarios', () => expect(wrapper.find('Scenario')).toHaveLength(0));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {
            feature: {elements: [{}]}
        };

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render scenario-list-container', () => expect(wrapper.find('.scenario-list-container')).toHaveLength(1));
        it('should render scenario-list', () => expect(wrapper.find('.scenario-list')).toHaveLength(1));
        it('should render 1 scenarios', () => expect(wrapper.find('Scenario')).toHaveLength(1));
    });
});
