import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('errors rendering', () => {
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

        it('should render features', () => expect(wrapper.find('.features')).toHaveLength(1));
        it('should render ValidationErrorsHeader', () => expect(wrapper.find('ValidationErrorsHeader')).toHaveLength(1));
        it('should render ValidationErrorList', () => expect(wrapper.find('ValidationErrorList')).toHaveLength(1));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {errors: []};

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render features', () => expect(wrapper.find('.features')).toHaveLength(1));
        it('should render ValidationErrorsHeader', () => expect(wrapper.find('ValidationErrorsHeader')).toHaveLength(1));
        it('should render ValidationErrorList', () => expect(wrapper.find('ValidationErrorList')).toHaveLength(1));
    });
});
