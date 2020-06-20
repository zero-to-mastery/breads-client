// import { LOAD_SUBSCRIPTION_READINGS } from './actionTypes';
// import { RECEIVE_ENTITIES } from '../actions';

// const subscription = (state = {}, action) => {
//     switch (action.type) {
//         case RECEIVE_ENTITIES:
//             console.log(action.list);
//             const { entities } = action.payload
//             if (entities && entities.readings && action.list === 'subscriptions') {
//                 return { ...entities.readings }
//             }
//         // case LOAD_SUBSCRIPTION_READINGS:
//         //     return {...action.subscriptions};
//         default:
//             return state;
//     }
// }

// export default subscription;