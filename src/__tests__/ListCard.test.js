import React from 'react';
import { shallow } from 'enzyme';
import ListCard from '../components/ListCard';

let removeSubscription = jest.fn();

function shallowSetup() {
    const props = {
        key: 1,
        id: 1,
        first: 'Bacon',
        last: 'Lover',
        user_id: 3,
        username: 'bacnlvr',
        image: 'www.image.com',
        summary: {
            id: 1,
            data: 'this is the summary'
        },
        pubs: 'yes',
        removeSubscription: removeSubscription
    }

    const enzymeWrapper = shallow(<ListCard {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe('Shallow rendered ListCard', () => {
    it('renders self', () => {
        const { enzymeWrapper, props } = shallowSetup();
        expect(enzymeWrapper.find('h5').text()).toBe(props.username);
        expect(enzymeWrapper.find('img').html()).toContain(props.image);
        expect(enzymeWrapper.find('.card-body').text()).toContain(props.first);
        expect(enzymeWrapper.find('.card-body').text()).toContain(props.last);
        expect(enzymeWrapper.find('.card-body').text()).toContain('Subscriptions');
    });
});

describe('Mounted ListCard', () => {
    let wrapper, props_;
    beforeEach(() => {
        const { enzymeWrapper, props } = shallowSetup()
        wrapper = enzymeWrapper;
        props_ = props;
    });
    afterEach(() => {
        removeSubscription.mockClear();
    });
    it('removes subscription when Unsubscribe is clicked', () => {
        const unsubscribe = wrapper.find('small.unsubscribe');
        unsubscribe.simulate('click');
        expect(removeSubscription).toBeCalled();
        expect(unsubscribe.text()).toBe('Unsubscribe');
    });
})

// 1. What is the output of the component i.e what does it render?
//  - item that displays image, username, first name, last name, link to subs, unsubscribe
// 2. Does the component render different results based on differing conditions?
//  - unsubscribe if not self pubs
// 3. What does the component do with functions passed to it as props?
//  - removeSubscription
// 4. What are the outcomes of a user interacting with the component?
//  - see user's readings, user's pubs, unsubscribe
