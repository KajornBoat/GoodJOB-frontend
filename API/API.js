
import Auth from './auth';
import Users from './user/user';

const User = new Users();

class API {
    auth = Auth;
    user = User;
}

const api = new API();
export default api;