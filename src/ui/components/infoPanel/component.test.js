import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('infoPanel rendering', () => {
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

        it('should render info panel', () => {
            expect(wrapper.find('.info-panel')).toHaveLength(1);
        });

        it('should render nothing inside info panel', () => {
            expect(wrapper.find('.info-panel').html()).toEqual("<div class=\"info-panel\"></div>");
        });
    });

    describe('shallow with data', () => {
        let wrapper;
        const props = {
            leftSideComponent: <div className="left-side-component">left</div>,
            rightSideComponent: <div className="right-side-component">right</div>
        };

        beforeEach(() => {
            wrapper = shallow(<Component {...props}/>);
        });

        it('should render left side component', () => {
            const leftSideComponent = wrapper.find('.info-panel').find('.left-side-component');

            expect(leftSideComponent).toHaveLength(1);
            expect(leftSideComponent.text()).toEqual("left");
        });

        it('should render right side component', () => {
            const rightSideComponent = wrapper.find('.info-panel').find('.right-side-component');

            expect(rightSideComponent).toHaveLength(1);
            expect(rightSideComponent.text()).toEqual("right");
        });
    });
});
