import { REMOVE_USER_READING } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';
import { NAME } from './constants';

export const getReadings = (state, list, fav) => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        let userReadings = state.readingsByList[`${list}`].map(id => {
            console.log(id);
            return state[NAME][id]
        }).reverse();
        if (fav) return userReadings.filter(reading => reading.favorite === reading.reader);
        return userReadings;
    }
}

export const getReadingById = (state, list, id) => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        return state.readings[id];
    }
}

const reading = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload
            if (entities && entities.readings) {
                return { ...state, ...entities.readings }
            }
        // case REMOVE_USER_READING:
        //     return {
        //         data: state.data.filter(reading => reading.id !== action.id),
        //         websites: state.websites
        //     };
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