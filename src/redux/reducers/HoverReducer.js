

export default (state = null, action) => {
    switch (action.type) {
        case 'set_hover':
            console.log(action);
            return action.payload;
        case 'reset_hover':
            console.log(action);
            return null;
        default:
            return state;
    }
};
