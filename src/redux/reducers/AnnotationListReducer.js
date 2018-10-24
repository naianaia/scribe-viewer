

export default (state = null, action) => {
    switch (action.type) {
        case 'get_annotations':
            console.log(action);
            return action.payload;
        default:
            return state;
    }
};
