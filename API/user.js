import firebase from './firebase/firebase';

const config  = require('./config.json');

class User {
  async getIdToken(){  
    const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(function(idToken) {
       return idToken;
      }).catch(function(error) {
        console.log(error)
      });
    return token;
  }
  async getIdTokenRefresh(){
    const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      return idToken;
     }).catch(function(error) {
       console.log(error)
     });
   return token;
  }
  async getUserID(){
    const IDtoken =  await this.getIdToken()
    const userID = await fetch(config.hostname+'/auth/getUID', {
        headers: { Authorization: `${IDtoken} ` },
      }).then((res) => res.json()
      .then(function(response){
        return response.userID;
      })
      .catch(error => console.log("there was an error --> " + error)));;
    return userID;
  }
  async getUser(){
      let IDtoken = await this.getIdToken();
      const user = await fetch(config.hostname+'/auth/getUser', {
          headers: { idtoken: `${IDtoken} ` },
        }).then((res) => res.json()
        .then(function(response){
          return response;
        })
        .catch(error => console.log("there was an error --> " + error)));;
      return user;
  }
  async createNewUser(){
      let IDtoken = await this.getIdToken();
      const user = await fetch(config.hostname+'/user/createNewUser', {
          headers: { idtoken: `${IDtoken} ` },
        }).catch(error => console.log("there was an error --> " + error));
  }
}

const user = new User();
export default user;