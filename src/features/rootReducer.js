import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import favoriteReadings from './favReadings';
import readings from './globalReadings/readingsReducer';
import summary from './summary/summaryReducer';
import subscriptions from './subscriptions/subscriptionsReducer';
import user from './user/userReducer';
import subscriptionReadings from './subReadings/subscriptionReadingsReducer';
import notifications from './notifications/notificationsReducer';
import loading from './loader/loadingReducer';
import userReadings from './userReadings/userReadingsReducer';
import search from './search/searchReducer';

const rootReducer = combineReducers({
    [auth.constants.NAME]: auth.reducer,
    [errors.constants.NAME]: errors.reducer,
    [favoriteReadings.constants.NAME]: favoriteReadings.reducer,
    readings,
    summary,
    subscriptions,
    user,
    subscriptionReadings,
    notifications,
    loading,
    userReadings,
    search
});
  
export default rootReducer;