import {authService} from '../../services/user';

export const Query = {
    async login(parent, { email, password }, ctx, info) {
       const data = await authService(email, password)
       return data;
    }
}