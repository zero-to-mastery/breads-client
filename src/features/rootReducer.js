import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import readings from './globalReadings/readingsReducer';
import summary from './summary/summaryReducer';
import subscriptions from './subscriptions/subscriptionsReducer';
import user from './user/userReducer';
import subscriptionReadings from './subReadings/subscriptionReadingsReducer';
import notifications from './notifications/notificationsReducer';
import loading from './loader/loadingReducer';
import userReadings from './userReadings/userReadingsReducer';
import search from './search/searchReducer';
import favoriteReadings from './favReadings/favoriteReadingsReducer';

const rootReducer = combineReducers({
    [auth.constants.NAME]: auth.reducer,
    [errors.constants.NAME]: errors.reducer,
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