import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import QueryReducer from './QueryReducer';
import HoverReducer from './HoverReducer';
import AnnotationListReducer from './AnnotationListReducer';

export default combineReducers({
    pageData: DataReducer,
    annotationListData: AnnotationListReducer,
    queryData: QueryReducer,
    hoverId: HoverReducer
});
