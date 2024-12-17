/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appWriteUrl);
    this.client.setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, uname }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        uname
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        console.log(userAccount);
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword({ email }) {
    try {
      await this.account.createRecovery(
        email,
        "http://localhost:5173/reset-password"
      );
    } catch (error) {
      console.log("ERROR in forgot password", error);
    }
  }
  async resetPassword({userId, secret,  password }) {
    try {
      const res = await this.account.updateRecovery(
        userId,
        secret,
        password.newPassword,
        password.repeatPassword
      );
      console.log(res);
    } catch (error) {
      console.log("ERROR in reset password", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
