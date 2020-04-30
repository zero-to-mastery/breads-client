import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import readings from './readings';
import summary from './summary';
import users from './users';
import subscriptions from './subscriptions';
import notifications from './notifications';

const rootReducer = combineReducers({
    currentUser,
    errors,
    readings,
    summary,
    users,
    subscriptions,
    notifications
});
  
export default rootReducer;