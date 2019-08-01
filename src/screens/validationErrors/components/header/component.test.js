import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('errors header rendering', () => {
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

        it('should render header', () => expect(wrapper.find('.header')).toHaveLength(1));
        it('should render header-title', () => expect(wrapper.find('.header-title')).toHaveLength(1));
        it('should render header-title-container', () => expect(wrapper.find('.header-title-container')).toHaveLength(1));
        it('should render cucumber-logo-errors', () => expect(wrapper.find('.cucumber-logo-errors')).toHaveLength(1));
    });
});
