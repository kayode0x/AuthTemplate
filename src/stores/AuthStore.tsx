import { proxy } from 'valtio';

//valtio implementation.
interface ITokens {
    accessToken: string | null;
    refreshToken: string | null;
}

const AuthStore = proxy<ITokens>({
    accessToken: null,
    refreshToken: null
})

export default AuthStore;