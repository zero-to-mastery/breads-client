import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import globalReadings from './globalReadings';
import loading from './loader';
import modals from './modals';
import notifications from './notifications';
import readingsByList from './readingsList';
import search from './search';
import subscriptions from './subscriptions';
import summary from './summary';
import tags from './tags';
import tagsByList from './tagsList';
import user from './user';

const rootReducer = combineReducers({
    [auth.constants.NAME]: auth.reducer,
    [alerts.constants.NAME]: alerts.reducer,
    [globalReadings.constants.NAME]: globalReadings.reducer,
    [loading.constants.NAME]: loading.reducer,
    [modals.constants.NAME]: modals.reducer,
    [notifications.constants.NAME]: notifications.reducer,
    [readingsByList.constants.NAME]: readingsByList.reducer,
    [search.constants.NAME]: search.reducer,
    [subscriptions.constants.NAME]: subscriptions.reducer,
    [summary.constants.NAME]: summary.reducer,
    [tags.constants.NAME]: tags.reducer,
    [tagsByList.constants.NAME]: tagsByList.reducer,
    [user.constants.NAME]: user.reducer
});
  
export default rootReducer;