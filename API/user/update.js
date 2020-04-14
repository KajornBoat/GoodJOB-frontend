import firebase from '../firebase/firebase';
import manageUser from "./manage"
const config  = require('../config.json');


class Update {

  async image(file){
    
    if(!file.cancelled){
      
      const response = await fetch(file.uri);
      const blob = await response.blob();
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };
      const uid = await manageUser.getUserID();
      const idToken = await manageUser.getIdToken();
     // console.log(uid)

      return new Promise((resolve, reject) => {

        const task = firebase.storage().ref().child('images/' + uid).put(blob, metadata);
        const taskProgress = snapshot => {

          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }

        };

        const taskError = reject;

        const taskCompleted = () => {
          task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
              fetch(config.hostname+'/user/updatePhotoURL', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "photoURL": downloadURL,
                "idtoken" : idToken

              }),
            }) 
            .then(result => {
              if(result.status === 200 ){
                resolve(downloadURL)
              }
              resolve(downloadURL)
            })
            .catch(reject);
          });
        };

        task.on("state_changed", taskProgress, taskError, taskCompleted);
      });

    }
  }
  async firstname(firstname){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idtoken" : idToken
      },
      body: JSON.stringify({ 
          "info": {
               "firstname" : firstname
                  }
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
  async lastName(lastname){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
          "lastname": lastname,
             }
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
  async gender(gender){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
          "gender": gender,
             }
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
  async province(currentProvince){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
          "current_province": currentProvince,
             }   
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;

  }
  async interested(interested){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
          "interested": interested,
             }   
        
        
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
  async introduce(introduce_text){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
           "introduce_text": introduce_text,
         }   
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
  async phoneNumber(phone_number){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
          "phone_number": phone_number,
         }   
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
  async id_card(id_card){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
          "id_card": id_card,
         }         
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
  async age(age){
    const idToken = await manageUser.getIdToken();
    const result = await fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idToken" : idToken
      },
      body: JSON.stringify({
        "info": {
          "age": age,
         }     
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
    if(result.status < 300) return result;
  }
}
const update = new Update();
export default update;