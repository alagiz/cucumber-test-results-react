import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('features infoPanel rendering', () => {
    describe('reactDOM', () => {
        it('should render without crashing', () => {
            const div = document.createElement('div');

            ReactDOM.render(<Component/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });

    describe('shallow without data', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<Component/>);
        });

        it('should render info panel', () => expect(wrapper.find('InfoPanel')).toHaveLength(1));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {
            filterData: () => null
        };

        beforeEach(() => {
            wrapper = shallow(<Component {...props}/>);
        });

        it('should render left side component', () => expect(wrapper.find('InfoPanel')).toHaveLength(1));
    });
});
