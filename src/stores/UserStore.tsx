import { proxy } from 'valtio';

//valtio implementation.
interface IUser {
    name: string | null,
    username: string | null,
    email: string | null,
    avatar: string | null,
    reminders: [] | null,
    emailVerified: boolean | null,
    isPro: boolean | null,
    getUser: () => IUser | null
}

const AuthStore = proxy<IUser>({
    name: null,
    username: null,
    email: null,
    avatar: null,
    reminders: null,
    emailVerified: null,
    isPro: null,
    getUser: () => null
})

export default AuthStore;