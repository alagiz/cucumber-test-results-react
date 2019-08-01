import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('scenario rendering', () => {
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

        it('should render scenario', () => expect(wrapper.find('.scenario')).toHaveLength(1));
        it('should render step-list-container', () => expect(wrapper.find('.step-list-container')).toHaveLength(1));
        it('should render step-list-title', () => expect(wrapper.find('.step-list-title')).toHaveLength(1));
        it('should render step-list', () => expect(wrapper.find('.step-list')).toHaveLength(1));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {
            scenario: {after: 0, steps: [], testsPassed: false, timeRate: 0}
        };

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render scenario', () => expect(wrapper.find('.scenario')).toHaveLength(1));
        it('should render step-list-container', () => expect(wrapper.find('.step-list-container')).toHaveLength(1));
        it('should render step-list-title', () => expect(wrapper.find('.step-list-title')).toHaveLength(1));
        it('should render step-list', () => expect(wrapper.find('.step-list')).toHaveLength(1));
    });
});
