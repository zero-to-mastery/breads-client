import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import readings from './readings';
import summary from './summary';
import users from './users';
import subscriptions from './subscriptions';
import notifications from './notifications';
import loading from './loading';
import userReadings from './userReadings';

const rootReducer = combineReducers({
    currentUser,
    errors,
    readings,
    summary,
    users,
    subscriptions,
    notifications,
    loading,
    userReadings
});
  
export default rootReducer;