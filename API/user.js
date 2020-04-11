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
    return firebase.auth().currentUser.uid;
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
  async uploadImage(file){
    
    if(!file.cancelled){
      
      const response = await fetch(file.uri);
      const blob = await response.blob();
      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };
      const uid = await this.getUserID();
      console.log(uid)
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = firebase.storage().ref().child('images/' + uid).put(blob, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          fetch(config.hostname+'/user/updatePhotoURL', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "photoURL": downloadURL
            }),
          }) 
          .catch((error) => {
            console.error('Error:', error);
          });

        });
      });
    }
  }

}

const user = new User();
export default user;