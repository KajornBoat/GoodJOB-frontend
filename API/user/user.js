import firebase from '../firebase/firebase';
import Update from './update'
import manage from "./manage"
const config  = require('../config.json');

export default class User {

  async getUser(){
      let IDtoken = await manage.getIdToken();
      
      const user = await fetch(config.hostname+'/auth/getUser', {
          headers: { idtoken: `${IDtoken} ` },
        }).then((res) => res.json()
        .then(function(response){
          return response;
        })
        .catch(error => console.log("there was an error --> " + error)));;
      return user;
  }
  
  update = Update;

}