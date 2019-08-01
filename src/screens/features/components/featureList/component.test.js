import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('features featureList rendering', () => {
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

        it('should render feature-list-container', () => expect(wrapper.find('.feature-list-container')).toHaveLength(1));
        it('should render feature-list', () => expect(wrapper.find('.feature-list')).toHaveLength(1));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {features: []};

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render feature-list-container', () => expect(wrapper.find('.feature-list-container')).toHaveLength(1));
        it('should render feature-list', () => expect(wrapper.find('.feature-list')).toHaveLength(1));
    });
});
