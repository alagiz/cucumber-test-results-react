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

        it('should render info tile', () => expect(wrapper.find('.info-tile')).toHaveLength(1));
        it('should render info tile title', () => expect(wrapper.find('.info-tile-top').text()).toBe(''));
        it('should render info tile title', () => expect(wrapper.find('.info-tile-bottom').text()).toBe(''));
    });


    describe('shallow with data', () => {
        let wrapper;

        describe('renders content as text', () => {
            const props = {
                infoToDisplay: {
                    title: 'test-title',
                    content: 'test-content'
                }
            };

            beforeEach(() => {
                wrapper = shallow(<Component {...props}/>);
            });

            it('should render info tile', () => expect(wrapper.find('.info-tile')).toHaveLength(1));
            it('should render info tile title div', () => expect(wrapper.find('.info-tile-top')).toHaveLength(1));
            it('should render info tile title', () => expect(wrapper.find('.info-tile-top').text()).toBe('TEST-TITLE'));
            it('should render info tile content', () => expect(wrapper.find('.info-tile-bottom')).toHaveLength(1));
            it('should render info tile content', () => expect(wrapper.find('.info-tile-bottom').text()).toBe('test-content'));
        });

        describe('renders content as html', () => {
            const props = {
                infoToDisplay: {
                    title: 'test-title',
                    content: <div className="test-content">test-div-content</div>
                }
            };

            beforeEach(() => {
                wrapper = shallow(<Component {...props}/>);
            });

            it('should render info tile', () => expect(wrapper.find('.info-tile')).toHaveLength(1));
            it('should render info tile title div', () => expect(wrapper.find('.info-tile-top')).toHaveLength(1));
            it('should render info tile title', () => expect(wrapper.find('.info-tile-top').text()).toBe('TEST-TITLE'));
            it('should render info tile content', () => expect(wrapper.find('.info-tile-bottom')).toHaveLength(1));
            it('should render info tile title', () => expect(wrapper.find('.info-tile-bottom').contains([<div className="test-content">test-div-content</div>])).toBeTruthy());
        });
    });
});
