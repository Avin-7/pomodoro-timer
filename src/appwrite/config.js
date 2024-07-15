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

    async storeData({date,usageTime,uname}) {
        try {
            await this.database.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId,ID.unique(), {
                Date: date,
                TotalTime: usageTime,
                uname: uname,
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
    async getDataOfDate({date}) {
        try {
            const res = await this.database.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId,[
                Query.equal('Date', date)
            ]);
            return res;
            
        } catch (error) {
            console.log(error);
        }
    }
    async getDataOfUsername({uname}) {
        try {
            const res = await this.database.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId,[
                Query.equal('uname', uname)
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