import firebase from 'firebase';

export const dataFetch = (city) => {
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