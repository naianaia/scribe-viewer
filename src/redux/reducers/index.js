import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import QueryReducer from './QueryReducer';

export default combineReducers({
    pageData: DataReducer,
    queryData: QueryReducer
});
