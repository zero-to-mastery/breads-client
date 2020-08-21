import { ADD_TAG, REMOVE_TAG, LOAD_TAGS, RECEIVE_ENTITIES } from '../actionTypes';

// const getIds = users => {
//     return Object.values(users).map(user => user.id);
// }

// HOW TO STRUCTURE TAGS STATE?
    // return tag info in readings apicall
    // normalize tag info into
        // readings - each reading has tags key with array of tag ids
        // tags - object key is tag id, value is array of tag_name, reading_id, user_id objects
    
        // I'm returning tags id with readings now. 
        // need to add user readings table - how to transfer data from one table to another?
            // user id, reading id, created date
            //  IS READING_TAGS ALREADY THE USER READINGS TABLE I NEED?
                // maybe a user tags table, user readings table, and reading tags table
                    // user -> tags, user -> readings, reading -> tags
const tags = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.tags) {
                return { ...state, ...entities.tags }
            }
        // case LOAD_TAGS:
        //     if (action && action.tags) {
        //         console.log(action.tags);
        //         return { ...state, ...action.tags }
        //     }
            // /* falls through */
        case ADD_TAG:
            if (action.id && action.user_id && state[action.id]) {
                return {
                    ...state,
                    upToDate: false,
                    [action.user_id]: {
                        ...state[action.user_id],
                        following: state[action.user_id].following.concat(action.id)
                    },
                    [action.id]: {
                        ...state[action.id],
                        followers: state[action.id].followers.concat(action.user_id)
                    }
                }
            } else if (action.id && action.user_id && !state[action.id]) {
                return {
                    ...state,
                    upToDate: false,
                    [action.user_id]: {
                        ...state[action.user_id],
                        following: state[action.user_id].following.concat(action.id)
                    }
                }
            }
            /* falls through */
        case REMOVE_TAG:
            const { id, user_id } = action;
            if (id && user_id && state[id]) {
                return {
                    ...state,
                    upToDate: true,
                    [user_id]: {
                        ...state[user_id],
                        following: state[user_id].following.filter(sub => sub !== id), 
                    },
                    [id]: {
                        ...state[id],
                        followers: state[id].followers.filter(pub => pub !== user_id)
                    }
                }
            } else if (id && user_id && !state[id]) {
                return {
                    ...state,
                    upToDate: true,
                    [user_id]: {
                        ...state[user_id],
                        following: state[user_id].following.filter(sub => sub !== id), 
                    }
                }
            }
            /* falls through */
        default:
            return state;
    }
}

export default tags;