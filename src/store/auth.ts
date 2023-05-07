import {defineStore} from "pinia";
import {getFromLocal, removeFromLocal, setToLocal, toUser} from "@/utils";
import User from "@/models/user";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getFromLocal('token').base64Decode(),
    user: getFromLocal('user').base64Decode().toObject(),
  }),
  getters: {
    getToken: (state) => state.token as string,
    valid: (state) => !!state.user as boolean,
    getUser: (state) => state.user as User,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: User) {
      this.user = user;
    },
    remove() {
      this.user = undefined;
      //@ts-ignore
      this.token = undefined;
      removeFromLocal('user');
      removeFromLocal('token');
    }
  }
});
