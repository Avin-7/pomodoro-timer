import { Client, ID, Databases, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(conf.appWriteUrl);
    this.client.setProject(conf.appWriteProjectId);
    this.database = new Databases(this.client);
  }

  async storeData({ content, completed, email, bgColor }) {
    try {
      await this.database.createDocument(
        conf.appWriteDatabaseId,
        conf.appWritetTodosCollectionId,
        ID.unique(),
        {
          content: content,
          completed: completed,
          email: email,
          bgColor: bgColor,
        }
      );
    } catch (error) {
      console.log(error + "::: ERROR IN STORE_DATA : TODO.JS");
    }
  }

  async getData({ userEmail }) {
    try {
      const res = await this.database.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWritetTodosCollectionId,
        [Query.equal("email", userEmail)]
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  // async getDataOfDate({date,email}) {
  //     try {
  //         const res = await this.database.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId,[
  //             Query.equal('Date', date),
  //             Query.equal('Email', email),
  //         ]);
  //         return res.total == 0? null:res;
  //     } catch (error) {
  //         console.log(error  +"::: error in getDataOfDate");
  //     }
  // }
  // async getDataOfEmail(email) {
  //     try {
  //         const res = await this.database.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId,[
  //             Query.equal('Email', email)
  //         ]);
  //         return res;

  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  async updateDocument(id, newContent) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWritetTodosCollectionId,
        id,
        {
          content: newContent,
        }
      );
    } catch (error) {
      console.log(error + "ERROR IN UPDATE_DOCUMENT : TODO.JS ...");
    }
  }
  async updateDocumentStatus(id, completed) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWritetTodosCollectionId,
        id,
        {
          completed: completed,
        }
      );
    } catch (error) {
      console.log(error + "ERROR IN UPDATE_DOCUMENT_STATUS : TODO.JS ...");
    }
  }
  async deleteDocument(id) {
    try {
      await this.database.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWritetTodosCollectionId,
        id
      );
    } catch (error) {
      console.log(error + "ERROR IN DELETE DOCUMENT : TODO.JS...");
    }
  }
}

const todoService = new Service();
export default todoService;