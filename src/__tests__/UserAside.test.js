import React from 'react';
import { shallow } from 'enzyme';
import UserAside from '../components/UserAside';

function shallowSetup() {
    const props = {
        id: 16,
        image: 'www.image.com',
        username: 'bacnlvr',
        readings: [{
            title: 'first reading',
            word_count: 5000,
            user_id: 16,
            image: 'www.image.com',
            username: 'bacnlvr',
        }, {
            title: 'second reading',
            word_count: 6730,
            user_id: 16,
            image: 'www.image.com',
            username: 'bacnlvr',
        }]
    }

    const enzymeWrapper = shallow(<UserAside {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe('Shallow rendered UserAside', () => {
    it('renders itself', () => {
        const { enzymeWrapper, props } = shallowSetup();
        expect(enzymeWrapper.find('img').hasClass('img-thumbnail')).toBe(true);
        expect(enzymeWrapper.find('h5').text()).toBe(props.username);
    });
});

describe('Mounted UserAside', () => {
    it('displays subscriptions and reading data when readings provided', () => {
        const { enzymeWrapper, props } = shallowSetup();
        
        let totalWords = 0;
        props.readings.forEach(r => {
            totalWords += r.word_count/100000;
        });

        expect(enzymeWrapper.find('.badge').text()).toBe('Subscriptions');
        expect(enzymeWrapper.find('.reading-sum').text()).toBe(`Readings: ${props.readings.length}`);
        expect(enzymeWrapper.find('.book-sum').text()).toBe(`Loaves: ${totalWords.toFixed(2)}`);
    });
});

// 1. What is the output of the component i.e what does it render?
//  - card that displays image, username, link to subscriptions, and readings
// 2. Does the component render different results based on differing conditions?
//  - shows readings data if available
// 3. What does the component do with functions passed to it as props?
//  - loops over reading data to display total reads and book equivalents
// 4. What are the outcomes of a user interacting with the component?
//  - can see subscriptions displayed
