import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('features infoPanel filter panel rendering', () => {
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

        it('should render features header', () => {
            expect(wrapper.find('.filter-panel')).toHaveLength(1);
        });

        it('should render features header', () => {
            expect(wrapper.find('.filter-panel').find('FilterButton')).toHaveLength(3);
        });
    });

    describe('shallow with data', () => {
        let wrapper;
        const props = {
            filterData: () => []
        };

        beforeEach(() => {
            wrapper = shallow(<Component {...props}/>);
        });

        it('should render features header', () => {
            expect(wrapper.find('.filter-panel')).toHaveLength(1);
        });

        it('should render features header', () => {
            expect(wrapper.find('.filter-panel').find('FilterButton')).toHaveLength(3);
        });
    });
});
