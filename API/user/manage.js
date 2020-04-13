import firebase from '../firebase/firebase';

class Manage {
    getIdToken = async () => {  
        const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(function(idToken) {
           return idToken;
          }).catch(function(error) {
            console.log(error)
          });
        return token;
      }
    getIdTokenRefresh = async () =>  {
        const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          return idToken;
         }).catch(function(error) {
           console.log(error)
         });
       return token;
      }
    getUserID = async () => {
        return firebase.auth().currentUser.uid;
    }
}

export default new Manage();