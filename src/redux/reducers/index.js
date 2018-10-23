import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import QueryReducer from './QueryReducer';
import HoverReducer from './HoverReducer';

export default combineReducers({
    pageData: DataReducer,
    queryData: QueryReducer,
    hoverId: HoverReducer
});
