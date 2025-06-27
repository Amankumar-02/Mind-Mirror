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
            return await this.account.createOAuth2Session("google", "https://mind-mirror.netlify.app", "http://localhost:5173")
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
    async updateUserName({newName}){
        try {
            return await this.account.updateName(newName);
        } catch (error) {
            throw("Mind Mirror UserName Update Error:" + error.message)
        }
    }
    async updateUserEmail({newEmail, emailConfirmPassword}){
        try {
            return await this.account.updateEmail(newEmail, emailConfirmPassword);
        } catch (error) {
            throw("Mind Mirror UserName Update Error:" + error.message)
        }
    }
    async updatePassword({oldPassword = "password", newPassword, confirmPassword}){
        try {
            if(newPassword !== confirmPassword){
                throw new Error("Confirm password is not match"); 
            }
            return await this.account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            throw("Mind Mirror UserName Update Error: Old password is invalid")
        }
    }
}

const authService = new AuthService();
export default authService