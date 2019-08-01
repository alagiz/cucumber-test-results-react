import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Component from './component';
import "../../../../setupTests"

describe('features header rendering', () => {
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

        it('should render features header', () => expect(wrapper.find('.features-header')).toHaveLength(1));

        it('should render title', () => {
            const featuresHeaderTitle = wrapper.find('.features-header-title');
            const expectedContent =
                <div className="features-header-title-container">
                    <div>Cucumber</div>
                    <div>LANA</div>
                </div>;

            expect(featuresHeaderTitle).toHaveLength(1);
            expect(featuresHeaderTitle.contains(expectedContent)).toEqual(true);
        });

        it('should render logo', () => expect(wrapper.find('.cucumber-logo')).toHaveLength(1));
    });
});
