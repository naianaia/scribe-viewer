

export default (state = false, action) => {
    switch (action.type) {
        case 'loading_data':
            return false;
        case 'loaded_data':
            return true;
        default:
            return state;
    }
};
