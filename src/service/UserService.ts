import { Roles, roleService } from "./RoleService";
import axios from "@/plugins/axios";

export interface User {
  id: number;
  fio: string;
  description: string;
  login: string;
  roles: Roles;
  created_at: Date;
  updated_at?: Date;
  last_visit?: Date;
}

export interface Users {
  data: User[];
  total: number;
  page_count: number;
}

class UserService {
  async find(page: number = 1, perPage: number = 5): Promise<Users> {
    return axios.get(`v1/users/page?page=${page}&per_page=${perPage}`);
  }
  async findById(id: number): Promise<User> {
    return axios.get(`v1/users/${id}/edit`);
  }

  async findByName(name: string): Promise<Users> {
    return axios.get(`v1/users/filter?name=${name}`);
  }

  async create(user: User): Promise<number> {
    return axios.post(`v1/users/add`, user);
  }

  async update(id: number, item: User) {
    return axios.patch(`v1/users/${id}/edit`, item);
  }

  async delete(id: number) {
    return axios.delete(`v1/users/${id}/remove`);
  }
}

export const userService = new UserService();
