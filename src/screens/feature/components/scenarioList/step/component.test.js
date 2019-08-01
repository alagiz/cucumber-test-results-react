import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('step rendering', () => {
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

        it('should render step-collapsible', () => expect(wrapper.find('.step-collapsible')).toHaveLength(1));
        it('should render step-error-details', () => expect(wrapper.find('.step-error-details')).toHaveLength(1));
        it('error-message', () => expect(wrapper.find('.error-message')).toHaveLength(1));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {
            step: {timeRate: 0, status: 'passed'}
        };

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render step', () => expect(wrapper.find('.step')).toHaveLength(1));
        it('should render step-content', () => expect(wrapper.find('.step-content')).toHaveLength(1));
        it('should render step-status-and-name', () => expect(wrapper.find('.step-status-and-name')).toHaveLength(1));
        it('should render step-name', () => expect(wrapper.find('.step-name')).toHaveLength(1));
    });
});
