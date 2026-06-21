import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();

            const userAccount = await this.account.create(ID.unique(), trimmedEmail, trimmedPassword, name);
            if (userAccount) {
                return this.login({ email: trimmedEmail, password: trimmedPassword });
            }
            return userAccount;
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            return await this.account.createEmailPasswordSession(trimmedEmail, trimmedPassword);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // No error log here as it's common to not have a user session on load
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
