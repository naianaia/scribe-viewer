import firebase from 'firebase';

export const dataFetch = () => {
    console.log("fetch start");
    return (dispatch) => {
        firebase.database().ref('/users/')
            .on('value', snapshot => {
                if (snapshot.val()) {
                    dispatch({ type: 'get_data', payload: snapshot.val() });
                }
            }, error => {
                console.error(error);
            });
    };
};

export const dataFetchStore = (userId, articleId) => {
    console.log("store fetch start");
    return (dispatch) => {
        var db = firebase.firestore();
        db.collection("users").doc(userId).collection("items").doc(articleId).onSnapshot((snapshot) => {
            if (snapshot.data()) {
                dispatch({ type: 'get_data', payload: snapshot.data() });
            }
        });
    }
};



export const setQuery = (uid, aid) => {
    return {
        type: 'set_query',
        payload: { uid: uid, aid: aid }
    };
}

export const setHover = (id) => {
    return {
        type: 'set_hover',
        payload: id
    }
} 

export const resetHover = () => {
    return {
        type: 'reset_hover',
        payload: {}
    }
} 