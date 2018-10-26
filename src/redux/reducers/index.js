import { combineReducers } from 'redux';
import DataReducer from './DataReducer';
import QueryReducer from './QueryReducer';
import HoverReducer from './HoverReducer';
import AnnotationListReducer from './AnnotationListReducer';
import AnnotatorReducer from './AnnotatorReducer';
import LoadingReducer from './LoadingReducer';

export default combineReducers({
    pageData: DataReducer,
    loaded: LoadingReducer,
    annotationListData: AnnotationListReducer,
    queryData: QueryReducer,
    hoverId: HoverReducer,
    annotator: AnnotatorReducer
});
