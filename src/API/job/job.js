import manageUser from "../user/manage";

import config from "../config.json"

class Job {
    async createJob(data){
        const idtoken = await manageUser.getIdToken();
        console.log("Send = ",data)
        console.log(idtoken)
        let job = await fetch(config.hostname+'/job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "idtoken" : idtoken
            },
            body: JSON.stringify(data),
          })
          .then( res => res.json()
          .then( result => {
            return result;
          }))
          .catch((error) => {
            console.error('Error:', error);
          });
        return job;
    }

}

var job = new Job();
export default job;