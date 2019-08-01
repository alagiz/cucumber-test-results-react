import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('features extraInfo serviceHealth rendering', () => {
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

        it('should render service health', () => expect(wrapper.find('.service-health')).toHaveLength(1));
        it('should render service health text', () => expect(wrapper.find('.service-health').text()).toBe(''));
    });


    describe('shallow with data', () => {
        let wrapper;
        const props = {
            service: {
                title: 'test-title',
                healthy: true,
                swaggerUrl: 'http://shmoogle.com'
            }
        };

        beforeEach(() => wrapper = shallow(<Component {...props}/>));

        it('should render service health', () => expect(wrapper.find('.service-health')).toHaveLength(1));
        it('should render service health text', () => expect(wrapper.html()).toEqual("<div class=\"service-health service-health-title-healthy\">test-title</div>"));
    });
});
