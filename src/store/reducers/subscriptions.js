import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTION } from '../actionTypes';

const subscription = (state={data: [], websites: []}, action) => {
    switch (action.type) {
        case LOAD_SUBSCRIPTIONS:
            return {...action.subscriptions};
        case REMOVE_SUBSCRIPTION:
            return {
                data: state.data.filter(sub => sub.id !== action.id),
                websites: state.websites
            }
        default:
            return state;
    }
}

export default subscription;