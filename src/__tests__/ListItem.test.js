import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../components/ListItem';

let [viewSummary, removeSummary, newSubscription, removeReading] = new Array(4).fill(jest.fn());

function shallowSetup() {
    const props = {
        key: 1,
        id: 1,
        title: 'I like bacon',
        domain: 'www.bacon.com',
        url: 'www.bacon.com/i_like_bacon',
        word_count: 2000,
        user_id: 3,
        username: 'bacnlvr',
        image: 'www.image.com',
        summary: {
            id: 1,
            data: 'this is the summary'
        },
        viewSummary: viewSummary,
        removeSummary: removeSummary,
        newSubscription: newSubscription,
        removeReading: removeReading,
        isCorrectUser: true
    }

    const enzymeWrapper = shallow(<ListItem {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe('Shallow rendered ListItem', () => {
    it('renders self', () => {
        const { enzymeWrapper, props } = shallowSetup();
        expect(enzymeWrapper.find('h5').text()).toBe(props.title);
        expect(enzymeWrapper.find('.lead').text()).toBe(props.domain);
        expect(enzymeWrapper.find('div.reading-area').find('p.text-muted').text()).toBe(`~${Number(props.word_count).toLocaleString()} words`);
        expect(enzymeWrapper.find('img').hasClass('timeline-image')).toBe(true);
        expect(enzymeWrapper.find('img').html()).toContain(props.image);
        expect(enzymeWrapper.find('p.btn.text-primary.m-2').text()).toBe(props.username);
    });
});

describe('Mounted ListItem', () => {
    let wrapper, props_;
    beforeEach(() => {
        const { enzymeWrapper, props } = shallowSetup()
        wrapper = enzymeWrapper;
        props_ = props;
    });
    afterEach(() => {
        viewSummary.mockClear();
        removeSummary.mockClear();
        newSubscription.mockClear();
        removeReading.mockClear();
    });
    it('displays Remove Summary button and Summary data when View Summary button is clicked', () => {
        const button = wrapper.find('p.btn.text-muted.m-2.ml-auto');
        button.simulate('click');
        expect(removeSummary).toBeCalled();
        expect(button.text()).toBe('Remove Summary');
        expect(wrapper.find('p.summary-data').text()).toBe(props_.summary.data);
    });
    it('displays Delete and calls removeReading if correct user', () => {
        const deleteButton = wrapper.find('p.delete');
        expect(deleteButton.text()).toBe('Delete');
        deleteButton.simulate('click');
        expect(removeReading).toBeCalled();
    });
    it('subscribes to a user when Subscribe is clicked', () => {
        const subscribe = wrapper.find('p.subscribe');
        subscribe.simulate('click');
        expect(newSubscription).toBeCalled();
        expect(subscribe.text()).toBe('Subscribe');
    });
});

// 1. What is the output of the component i.e what does it render?
//  - item that displays title, domain, word count, img, username, summary button, correct user
// 2. Does the component render different results based on differing conditions?
//  - view summary button shows summary data
// 3. What does the component do with functions passed to it as props?
//  - fetchSummary, removeSummary, postNewSubscription, removeReading
// 4. What are the outcomes of a user interacting with the component?
//  - user goes to url, deletes reading, displays/removes summary, subscribes, goes to user page
