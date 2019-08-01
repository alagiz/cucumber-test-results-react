import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('feature infoPanel rendering', () => {
    describe('reactDOM', () => {
        it('should render without crashing', () => {
            const div = document.createElement('div');
            const props = {
                extraInfo: []
            };

            ReactDOM.render(<Component {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });

    describe('shallow without data', () => {
        let wrapper;

        beforeEach(() => wrapper = shallow(<Component/>));

        it('should render infoPanel', () => expect(wrapper.find('InfoPanel')).toHaveLength(1));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {
            filterData: () => null,
            feature: {
                maxScenarioTime: 0
            }
        };

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render infoPanel', () => expect(wrapper.find('InfoPanel')).toHaveLength(1));
    });
});
