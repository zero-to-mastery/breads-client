import { RECEIVE_ENTITIES, ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTIONS, LOAD_SUBSCRIPTIONS } from '../actionTypes';

const getIds = users => {
    return Object.values(users).map(user => user.id);
}

const subscriptions = (state = { upToDate: false }, action) => {
    switch (action.type) {
        // case RECEIVE_ENTITIES:
        //     const { entities } = action.payload;

        //     if (entities && entities.users && action.list === action.id) {
        //         return {
        //             ...state,
        //             upToDate: true,
        //             // [action.list]: {
        //             //     getIds(entities.users)
        //             // }
        //         }
        //     } else if (!entities.users && action.list === action.id) {
        //         return { ...state, upToDate: true, [action.list]: []}
        //     }
        //     /* falls through */
        case LOAD_SUBSCRIPTIONS:
            if (action && action.users) {
                return {
                    ...state,
                    upToDate: true,
                    [action.id]: {
                        following: getIds(action.users.following),
                        followers: getIds(action.users.followers)
                    }
                }
            }
            /* falls through */
        case ADD_SUBSCRIPTION:
            if (action.id && action.user_id) {
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
            }
            /* falls through */
        case REMOVE_SUBSCRIPTIONS:
            const { id, user_id } = action;
            if (id && user_id) {
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
            }
            /* falls through */
        default:
            return state;
    }
}

export default subscriptions;