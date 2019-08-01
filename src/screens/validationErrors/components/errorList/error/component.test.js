import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('errors errorList error rendering', () => {
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

        it('should render validation-error', () => expect(wrapper.find('.validation-error')).toHaveLength(1));
        it('should render validation-error-item', () => expect(wrapper.find('.validation-error-item')).toHaveLength(2));
        it('should render error-label', () => expect(wrapper.find('.error-label')).toHaveLength(2));
    });
});
