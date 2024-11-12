import config from "../config/config";
import { Client, ID, Account } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // call another function
                this.createLogin({email, password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw("Mind Mirror :" + error.message)
        }
    }
    async createLogin({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw("Mind Mirror :" + error.message)
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Mind Mirror :" + error.message)
        }
        return null
    }
    async createLogout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Mind Mirror :" + error.message)
        }
    }
    async createGoogleLogin(){
        try {
            return await this.account.createOAuth2Session("google", "http://localhost:5173")
        } catch (error) {
            throw("Mind Mirror Google OAuth Error:" + error.message)
        }
    }
    async createGuestLogin(){
        try {
            return await this.account.createAnonymousSession();
        } catch (error) {
            throw("Mind Mirror Anonymous User Error:" + error.message)
        }
    }
}

const authService = new AuthService();
export default authService