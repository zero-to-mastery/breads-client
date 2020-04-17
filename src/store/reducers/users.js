import { LOAD_USERS } from '../actionTypes';//, FILTER_USERS

const user = (state=[], action) => {
    switch (action.type) {
        case LOAD_USERS:
            return [...action.users];
        // case FILTER_USERS:
        //     // return state.filter(user => user.username !== action.username);
        //     console.log(action.users);
        default:
            return state;
    }
}

export default user;