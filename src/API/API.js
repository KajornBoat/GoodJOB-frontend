
import Auth from './auth';
import Users from './user/user';
import Job from './job/job'

const User = new Users();

class API {
    auth = Auth;
    user = User;
    job = Job;
}

const api = new API();
export default api;