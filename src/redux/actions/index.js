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
        dispatch({ type: 'loading_data', payload: null });
        var db = firebase.firestore();
        db.collection("users").doc(userId).onSnapshot((snapshotUser) => {
            if (snapshotUser.data()) {
                db.collection("users").doc(userId).collection("items").doc(articleId).onSnapshot((snapshot) => {
                    if (snapshot.data()) {
                        dispatch({ type: 'get_data', payload: { 
                            page: snapshot.data(), 
                            userName: snapshotUser.data().name, 
                            userAvatar: snapshotUser.data().avatar 
                        } });
                        dispatch({ type: 'loaded_data', payload: null });
                    }
                });
            }
        });
    }
};

export const dataFetchAnnotations = (userId, articleId) => {
    console.log("annotation fetch start");
    return (dispatch) => {
        var db = firebase.firestore();
        db.collection("users").doc(userId).collection("items").doc(articleId).collection("annotations").onSnapshot((snapshot) => {
            var annotationList = {};
            snapshot.forEach((doc) => {
                annotationList[doc.id] = doc.data();
            });
            console.log(annotationList);
            dispatch({ type: 'get_annotations', payload: annotationList });
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


export const getAnnotator = (authorId) => {
    console.log("annotation author fetch start");
    return (dispatch) => {
        var db = firebase.firestore();
        db.collection("users").doc(authorId).onSnapshot((snapshot) => {
            dispatch({ type: 'get_annotator', payload: { name: snapshot.data().name, avatar: snapshot.data().avatar } });
        });
    }
}