import firebase from '../firebase/firebase';
import manageUser from "../user/manage";

import config from "../config.json"

class Job {
    async createJob(data){
        let token = manageUser.getIdToken();
        console.log("Send = ",data)
        let job = await fetch(config.hostname+'/job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "idtoken" : token
            },
            body: JSON.stringify({ 
                "info": data
            }),
          })
          .then( res => res.json()
          .then( result => {
            console.log("Result = ",result);
            return result;
          }))
          .catch((error) => {
            console.error('Error:', error);
          });
        console.log("JOB = ",job)
        return job;
    }

}

var job = new Job();
export default job;