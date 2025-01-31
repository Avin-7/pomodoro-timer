import { Client, ID, Databases,Query} from "appwrite";
import conf from '../conf/conf.js'

export class Service{
    client = new Client()
    database;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        this.client.setProject(conf.appWriteProjectId)
        this.database = new Databases(this.client)
    }

    async storeData({date,usageTime,userEmail}) {
        try {
            await this.database.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId,ID.unique(), {
                Date: date,
                TotalTime: usageTime,
                Email: userEmail,
            });
            
        } catch (error) {
            console.log(error);
        }
    }


    async getData() {
        try {
            const res = await this.database.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId);
            return res
            
        } catch (error) {
            console.log(error);
        }
    }
    async getDataOfDate({date,userEmail}) {
        try {
            const res = await this.database.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId,[
                Query.equal('Date', date),
                Query.equal('Email', userEmail),
            ]);
            return res.total == 0? null:res;
        } catch (error) {
            console.log(error  +"::: error in getDataOfDate");
        }
    }
    async getDataOfEmail(email) {
        try {
            const res = await this.database.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId,[
                Query.equal('Email', email)
            ]);
            return res;
            
        } catch (error) {
            console.log(error);
        }
    }

    async updateDocument(id, newTime) {
        try {
            
            return await this.database.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, id, {
                TotalTime: newTime,
            });
        } catch (error) {
            console.log(error);
        }

    }
}

const service = new Service()
export default service;