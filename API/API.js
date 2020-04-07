
import Auth from './auth';
import User from './user';

class API {
    auth = Auth;
    user = User;
}

const api = new API();
export default api;