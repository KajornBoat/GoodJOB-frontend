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
                "idToken" idToken

              }),
            }) 
            .then(result => {
              if(result.status === 200 ){
                resolve(downloadURL)
              }
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
    fetch(config.hostname+'/user/updateFirstname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "firstname": firstname,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async lastName(lastname){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateLastname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "lastname": lastname,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async gender(gender){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateGender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "gender": gender,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async role(CurrentRole){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateCurrentRole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "current_role": CurrentRole,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async province(currentProvince){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateCurrentProvince', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "current_province": currentProvince,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });

  }
  async interested(interested){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateInterested', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "interested": interested,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async introduce(introduce_text){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateIntroduce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "introduce_text": introduce_text,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async phoneNumber(phone_number){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updatePhoneNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phone_number": phone_number,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async id_card(id_card){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateID_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id_card": id_card,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async age(age){
    const idToken = await manageUser.getIdToken();
    fetch(config.hostname+'/user/updateAge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "age": age,
        "idToken" : idToken
      }),
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
const update = new Update();
export default update;