import { LOAD_SUBSCRIPTION_READINGS } from '../actionTypes';

const subscription = (state={data: [], websites: []}, action) => {
    switch (action.type) {
        case LOAD_SUBSCRIPTION_READINGS:
            return {...action.subscriptions};
        default:
            return state;
    }
}

export default subscription;