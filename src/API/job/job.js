import manageUser from "../user/manage";

import config from "../config.json"

class Job {
    employer = {
       async createJob(data){
        const idtoken = await manageUser.getIdToken();
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
      },
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
      },
      async getEmployee(jobId,mode){
      const idtoken = await manageUser.getIdToken();   
        type = "";
        if(mode) type = "?mode="+mode
        //5eae3c36aa35800021301e18
        let employee = await fetch(config.hostname+'/job/'+jobId+"/users"+type , {
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
      },
      async acceptUser(jobID,userID,status){
        const idtoken = await manageUser.getIdToken();  
        return await fetch(config.hostname+'/job/'+jobID+"/owneraccept/"+userID+"?status="+status , {
          method: 'PUT',
          headers: {
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
      },
      async inviteUser(jobID,userID,position){
        const idtoken = await manageUser.getIdToken();  
        return await fetch(config.hostname+'/job/'+jobID+"/select" , {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              "idtoken" : idtoken
          },
          body : JSON.stringify({
            "userId": userID,
            "pos" : position
          })
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
      },
      async finishJob(jobID,userID){
        const idtoken = await manageUser.getIdToken();  
        return await fetch(config.hostname+'/job/'+jobID+"/end/"+userID , {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              "idtoken" : idtoken
          }       
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
      }



    }
   
    
    
    
    employee = {    
      async getJobs(type){
        
        const idtoken = await manageUser.getIdToken(); 

        let routs = config.hostname
        
        switch (type) {
          case "jobAcceptReducer":
            routs += '/user/job/select?status=accept';
            break;
          case "jobInviteReducer":
            routs += '/user/job/select?status=inviting';
            break;
          case "jobStatusReducer":
            routs += '/user/job/select?status=applying';
            break;
          case "jobApplyReducer":
            routs += '/job/available';
            break;
          case "jobHistoryReducer":
            routs += '/user/job/select?status=finished';
            break;
          default:
            break;
        }
        //console.log(routs)
        return await fetch(routs , {
          method: 'GET',
          headers: {
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

      },
      async applyJob(jobID,position){
        const idtoken = await manageUser.getIdToken();
        console.log("Apply : ",position," id " ,jobID) 
        return await fetch(config.hostname+'/job/'+jobID+"/apply" , {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "idtoken" : idtoken
          },
          body : JSON.stringify({
            "position": position
          })
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
      },
      async acceptJob(jobID,status){
        const idtoken = await manageUser.getIdToken();
        console.log("jobID : ",jobID," status " ,status) 
        return await fetch(config.hostname+'/job/'+jobID+"/useraccept" , {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              "idtoken" : idtoken
          }
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
      }
      
    }

}

var job = new Job();
export default job;