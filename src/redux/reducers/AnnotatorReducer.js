
const INITIAL_STATE = {
    name: "",
    avatar: ""
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'get_annotator':
            console.log(action);
            return action.payload;
        default:
            return state;
    }
};
