const INITIAL_STATE = {
    uid: "",
    aid: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'set_query':
            console.log(action);
            return action.payload;
        default:
            return state;
    }
};