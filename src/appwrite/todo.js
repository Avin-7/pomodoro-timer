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
      return await this.database.createDocument(
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
      return await this.database.deleteDocument(
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
