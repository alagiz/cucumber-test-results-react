import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('feature infoPanel legend rendering', () => {
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

        it('should render info-panel-legend', () => expect(wrapper.find('.info-panel-legend')).toHaveLength(1));
        it('should render feature-info-panel-title', () => expect(wrapper.find('.feature-info-panel-title')).toHaveLength(1));
        it('should render feature-legend-item-container', () => expect(wrapper.find('.feature-legend-item-container')).toHaveLength(1));
        it('should render legend-item', () => expect(wrapper.find('.legend-item')).toHaveLength(3));
        it('should render square', () => expect(wrapper.find('.square')).toHaveLength(3));
        it('should render passed', () => expect(wrapper.find('.passed')).toHaveLength(1));
        it('should render failed', () => expect(wrapper.find('.failed')).toHaveLength(1));
    });
});
