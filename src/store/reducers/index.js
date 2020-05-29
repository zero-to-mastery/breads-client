import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import readings from './readings';
import summary from './summary';
import subscriptions from './subscriptions';
import user from './user';
import subscriptionReadings from './subscriptionReadings';
import notifications from './notifications';
import loading from './loading';
import userReadings from './userReadings';
import search from './search';
import favoriteReadings from './favoriteReadings';

const rootReducer = combineReducers({
    currentUser,
    errors,
    readings,
    summary,
    subscriptions,
    user,
    subscriptionReadings,
    notifications,
    loading,
    userReadings,
    search,
    favoriteReadings
});
  
export default rootReducer;