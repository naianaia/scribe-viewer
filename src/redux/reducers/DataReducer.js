
const INITIAL_STATE = {
    page: false,
    userName: "",
    userAvatar: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'get_data':
            console.log(action);
            return action.payload;
        default:
            return state;
    }
};
