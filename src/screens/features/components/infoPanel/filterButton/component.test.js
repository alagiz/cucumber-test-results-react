import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';

describe('features infoPanel filter button rendering', () => {
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

        it('should render filter-button', () => {
            expect(wrapper.find('.filter-button')).toHaveLength(1);
        });
    });

    describe('shallow with props', () => {
        let wrapper;
        const props = {
            buttonId: 'passed'
        };

        beforeEach(() => {
            wrapper = shallow(<Component {...props}/>);
        });

        it('should render filter-button', () => {
            expect(wrapper.find('.filter-button')).toHaveLength(1);
        });

        it('should render filter-button with given id', () => {
            expect(wrapper.find('.show-passed')).toHaveLength(1);
        });
    });
});

describe('features infoPanel filter button functions', () => {
    describe('handleOnClick', () => {
        let wrapper;
        const props = {
            filterData: instance => instance.testProp = 'testProp',
            buttonId: 'test-button'
        };

        beforeEach(() => {
            wrapper = shallow(<Component {...props}/>);
        });

        it(`should execute passed in function if it's a function`, () => {
            const instance = wrapper.instance();

            instance.handleOnClick(null, instance);

            expect(instance.testProp).toEqual('testProp');
        });

        it(`should throw an error if it's not a function`, () => {
            const props = {filterData: 'notAFunction'};
            const wrapper = shallow(<Component {...props}/>);
            const instance = wrapper.instance();

            const handleOnClick = () => instance.handleOnClick(null, instance);

            expect(handleOnClick).toThrowError(/^Thing passed to the button is not a function!$/);
        });

        it('should call a handleClick function when clicked', () => {
            const handleOnClick = spyOn(wrapper.instance(), 'handleOnClick');

            wrapper.simulate('click');

            expect(handleOnClick).toBeCalled();
        });

        it('handleClick function should do business', () => {
            const props = {};

            props.testObject = {testValue: 0};
            props.buttonId = 'test-button';
            props.filterData = buttonId => props.testObject.testValue = buttonId;

            const wrapper = shallow(<Component {...props}/>);
            const instance = wrapper.instance();

            wrapper.simulate('click');

            expect(instance.props.testObject.testValue).toEqual('test-button');
        });
    });
});
