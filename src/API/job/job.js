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
    async getJobEmployer(){
      const idtoken = await manageUser.getIdToken();   
      let job = await fetch(config.hostname+'/job', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "idtoken" : idtoken
          }
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
    async getEmployee(jobId,mode){
      const idtoken = await manageUser.getIdToken();   
      type = "";
      if(mode) type = "?mode="+mode
      let employee = await fetch(config.hostname+'/job/'+"5eae3c36aa35800021301e18"+"/users"+"" , {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "idtoken" : idtoken
          }
        })
        .then( res => res.json()
        .then( result => {
          return result;
        }))
        .catch((error) => {
          console.error('Error:', error);
        });
      return employee;
    }
    async acceptJob(jobID,userID,status){
      const idtoken = await manageUser.getIdToken();  
      return await fetch(config.hostname+'/job/'+"5eae3c36aa35800021301e18"+"/users"+"" , { //fetch(config.hostname+'/job/'+jobID+"/accepting/"+userID+"?status="+status , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "idtoken" : idtoken
        }
      })
      .then( res => res.json()
      .then( result => {
        return result;
      }))
      .catch((error) => {
        console.error('Error:', error);
      });
    }

}

var job = new Job();
export default job;