import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    storage;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
   }
   //post 
   async createPost({title, slug, content, featuredImage, userId, status, author}){
    try {
        return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {title, content, featuredImage, userId, status, author})
    } catch (error) {
        throw "Medium " + error.message;
        return false
    }
   }
   async updatePost(slug, {title, content, featuredImage, status}){
    try {
        return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {title, content, featuredImage, status})
    } catch (error) {
        throw "Medium " + error.message;
        return false;
    }
   }
   async deletePost(slug){
    try {
        await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
        return true
    } catch (error) {
        throw "Medium " + error.message;
        return false;
    }
   }
   async getPost(slug){
    try {
        return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
    } catch (error) {
        throw "Medium " + error.message;
        return false;
    }
   }
   async getPosts(queries = [Query.equal('status', 'active')]){
    try {
        return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries)
    } catch (error) {
        throw "Medium " + error.message;
        return false;
    }
   }

   // upload
   async uploadFile(file){
    try {
        return await this.storage.createFile(config.appwriteBucketId, ID.unique(), file)
    } catch (error) {
        throw "Medium " + error.message;
        return false;
    }
   }
//    async updatePost(fileId){
//     try {
//         await this.storage.updateFile(config.appWriteBucketId, fileId)
//         return true
//     } catch (error) {
//         console.log(`Error found: postServices : updatePost`, error)
//         return false
//     }
//    }
   async deleteFile(fileId){
    try {
        await this.storage.deleteFile(config.appwriteBucketId, fileId)
        return true
    } catch (error) {
        throw "Medium " + error.message;
        return false;
    }
   }
   getFilePreview(fileId){
        return this.storage.getFilePreview(config.appwriteBucketId, fileId)
   }
}

const appwriteService = new Service();
export default appwriteService;