import { LOAD_READINGS, REMOVE_READING } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';

export const getReadings = state => {
    if (state.readingsByList['global']) { // give time for readingsByList to add global object
        return state.readingsByList['global'].map(id => {
            return state.globalReadings[id];
        }).reverse();
    }
}

export const getSubscriptionReadings = state => {
    if (state.readingsByList['subscriptions']) { // give time for readingsByList to add subscriptions object
        return state.readingsByList['subscriptions'].map(id => {
            return state.globalReadings[id];
        }).reverse();
    }
}

export const getUserReadings = (state, id) => {
    if (state.readingsByList[`${id}`]) { // give time for readingsByList to add user object
        return state.readingsByList[`${id}`].map(id => {
            return state.globalReadings[id];
        }).reverse();
    }
}

// normalized global readings and users - check
// added a selector to get all readings - check
// need to return user associated with each reading - CHECK!!!!!
//      pass reader id to list item
//      connect list item to store
//      getUserById selector so each list item accesses the store only for it's user
//      will probably need to do the same for reading data once reading lists are added to store shape

// based on route, select a list, and make api call to db for list's data
//      store list's data as array in readingsByList and store other info in readings, users
// do the same for sub, fav, and user readings list
// readingsByList updates it's item list whenever a reading updates
// readingsByList object in store that
//      listName
//          didInvalidate: Boolean,
//          items: [ readings by id listed here ]

// readings feature - CHECK!!
//     check if items are in readingsList,
//     if not, get from db and add to readings and List
// readingsList feature
//     [ ...readings.id ]


const reading = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload
            if (entities && entities.readings) {
                return { ...state, ...entities.readings }
            }
        case LOAD_READINGS:
            return {...action.readings};
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



// ######################################################################
// const byId = (state ={}, action) => {
//     switch (action.type) {
//         case 'INVALIDATE':
//         case 'LOAD':
//             return { ...state, [action.id]: readings(state[action.id], action) }
//         case 'DELETE':
//             // return state with id deleted
//         default:
//             return state;
//     }
// }

// const allIds = (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_READING':
//             return [ ...state, action.id ];
//         default:
//             return state;
//     }
// }

// const readings = combineReducers({
//     byId,
//     allIds
// });