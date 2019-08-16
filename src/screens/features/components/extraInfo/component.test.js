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

        beforeEach(() => wrapper = shallow(<Component/>));

        it('should render service health container', () => expect(wrapper.find('.services-health-container')).toHaveLength(1));
        it('should render service health title', () => expect(wrapper.find('.services-health-title')).toHaveLength(1));
        it('should render service health status container', () => expect(wrapper.find('.services-health-status-container')).toHaveLength(1));
        it('should render ServiceHealth', () => expect(wrapper.find('ServiceHealth')).toHaveLength(11));
    });

    describe('shallow with data', () => {
        let wrapper;
        const props = {
            filterData: () => null,
            extraInfo: []
        };

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render services-health-container', () => expect(wrapper.find('.services-health-container')).toHaveLength(1));
        it('should render service health title', () => expect(wrapper.find('.services-health-title')).toHaveLength(1));
        it('should render service health status container', () => expect(wrapper.find('.services-health-status-container')).toHaveLength(1));
        it('should render ServiceHealth', () => expect(wrapper.find('ServiceHealth')).toHaveLength(11));
    });
});
