import { REMOVE_READING } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';
import { NAME } from './constants';

export const getReadings = (state, id) => {
    if (state.readingsByList[`${id}`]) { // give time for readingsByList to add object
        return state.readingsByList[`${id}`].map(id => {
            return state[NAME][id];
        }).reverse();
    }
}

export const getUserReadings = (state, id) => {
    if (state.readingsByList[`${id}`]) { // give time for readingsByList to add user object
        return state.readingsByList[`${id}`].map(id => {
            return state[NAME][id];
        }).reverse();
    }
}

export const getFavoriteReadings = (state, id) => {
    if (state.readingsByList[`${id}`]) { // give time for readingsByList to add user object
        let userReadings = getUserReadings(state, id);
        return userReadings.filter(reading => reading.favorite === reading.reader);
    }
}

const reading = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload
            if (entities && entities.readings) {
                return { ...state, ...entities.readings }
            }
        case REMOVE_READING:
            return {
                data: state.data.filter(reading => reading.id !== action.id),
                websites: state.websites
            };
        default:
            return state;
    }
}

export default reading;

// selected list: global, user, sub
// entities:
//      users
//          byId
//              id
//              username
//              image
//              favorites?
//              subscriptions?
//              notifications?
//          allIds [ 1,2,3,4,5,6,7,8 ]
//      readings
//          byId
//              id
//              title
//              url
//              domain
//              summary = ''
//          allIds [ 123, 124, 215, 126, 267 ]
// readingsByList
//      global
//          didInvalidate
//          items [ 123, 124, 215, 126, 267 ]
//      user
//          didInvalidate
//          items [ 215, 126, 267 ]
//      subscription
//          didInvalidate
//          items [ 123, 124 ]

// search -> only search DB if not currently in users or readings
// errors
// loading

// function readingsByList(state = {}, action) {
//     switch (action.type) {
//         case INVALIDATE_SUBREDDIT:
//         case LOAD:
//         case DELETE: //what to do on delete? remove from readingsByList array
//             return { [action.list]: readings(state[action.list], action) }
//         default:
//             return state;
//     }
// }

// const rootReducer = combineReducers({
//     selectedList,
//     readingsByList
// });

// export default rootReducer;