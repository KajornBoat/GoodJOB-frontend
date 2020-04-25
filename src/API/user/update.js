import firebase from '../firebase/firebase';
import manageUser from "./manage"
const config  = require('../config.json');

const updateData = async (data) => {
  const idToken = await manageUser.getIdToken();
  return new Promise((resolve, reject) => {
    fetch(config.hostname+'/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "idtoken" : idToken
      },
      body: JSON.stringify({ 
          "info": data
      }),
    }).then(result => {
      if(result.status < 300) resolve(result);
      else reject("Result status fail !!!")
    })
    .catch((error) => {
      console.error('Error:', error);
      reject(error);
    });
  })
}

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
              fetch(config.hostname+'/user', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                "idtoken" : idToken
              },
              body: JSON.stringify({
                "info": {
                  "photoURL": downloadURL,
                     }
                
              }),
            }) 
            .then(result => {
              if(result.status < 300 ){
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
  async firstname(data){
    return await updateData({"firstname" : data});
  }
  async lastName(data){
    return await updateData({"lastname" : data});
  }
  async gender(data){
    return await updateData({"gender" : data});
  }
  async province(data){
    return await updateData({"current_province" : data});
  }
  async interested(data){
    return await updateData({"interested" : data});
  }
  async introduce(data){
    return await updateData({"introduce_text" : data});
  }
  async phoneNumber(data){
    return await updateData({"phone_number" : data});
  }
  async id_card(data){
    return await updateData({"id_card" : data});
  }
  async age(data){
    return await updateData({"age" : data});
  }
  async role(data){
    return await updateData({"current_role" : data});
  }

}

const update = new Update();
export default update;