import firebase from './firebase/firebase';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import manageUser from "./user/manage";

const configAuth = require('./firebase/firebaseConfig');
const config = require("./config.json")


class Auth {
    async login(){
      const idToken = await manageUser.getIdToken();
      //console.log("Login IDTOKEN = ",idToken)
      return await fetch(config.hostname+'/auth/login', {
        method: 'GET',
        headers: {
          "idtoken" : idToken
        },
      })
      .then( res => res.json()
      .then( result => {
        return result;
      }))
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    __isUserEqual(googleUser, firebaseUser){
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
                firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };
      __onSignIn = async (googleUser) => {
        //console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
          function(firebaseUser) {
          
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.__isUserEqual(googleUser, firebaseUser)) {
              // Build Firebase credential with the Google ID token.
              var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
              );
              // Sign in with credential from the Google user.
              firebase
                .auth()
                .signInWithCredential(credential)
                .then( result =>  {
                  console.log('user signed in ');
                })
                .catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                });
            } else {
              console.log('User already signed-in Firebase.');
            }
          }.bind(this)
        );
      };
      async signInWithGoogleAsync(){
        try {
          //console.log("Press")
          const result = await Google.logInAsync(configAuth);
          //console.log("Login ",result.idToken)
          if (result.type === 'success') { 
            this.__onSignIn(result);
            return result.accessToken;
            
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
      async signInWithFacebook() {
        try {
            await Facebook.initializeAsync('246159856572460');
            const {
              type,
              token,
              expires,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile'],
            });
            if (type === 'success') {
              // Get the user's name using Facebook's Graph API
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

              const credential = firebase.auth.FacebookAuthProvider.credential(token)
              firebase
              .auth()
              .signInWithCredential(credential)
              .then(result => {
                console.log('user signed in ');

              }).catch((error) => {
                    console.log(error)
                });
              
              console.log('Logged in!', `Hi ${(await response.json()).name}!`)
              
            } else {
              // type === 'cancel'
            }

          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
      }
      signOut(){
        firebase.auth().signOut()
      }
     
}

const auth = new Auth();
export default auth;