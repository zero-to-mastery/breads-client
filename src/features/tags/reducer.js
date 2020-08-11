import { ADD_TAGS, REMOVE_TAGS, LOAD_TAGS } from '../actionTypes';

// const getIds = users => {
//     return Object.values(users).map(user => user.id);
// }

// HOW TO STRUCTURE TAGS STATE?
    // return tag info in readings apicall
    // normalize tag info into
        // readings - each reading has tags key with array of tag ids
        // tags - object key is tag id, value is array of reading_id and user_id objects
const tags = (state = {}, action) => {
    switch (action.type) {
        case LOAD_TAGS:
            // if (action && action.users) {
            //     return {
            //         ...state,
            //         upToDate: true,
            //         [action.id]: {
            //             following: getIds(action.users.following),
            //             followers: getIds(action.users.followers)
            //         }
            //     }
            // }
            // /* falls through */
        case ADD_TAGS:
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
        case REMOVE_TAGS:
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