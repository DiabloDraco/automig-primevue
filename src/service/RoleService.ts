import axios from "@/plugins/axios";

export interface Role {
  id: number;
  name: string;
  description: string;
}

export type Roles = Role[];

class RoleService {
  async find(): Promise<Roles> {
    return axios.get(`v1/roles/page`);
  }

  async findById(id: number): Promise<Role> {
    return axios.get(`v1/roles/${id}/edit`);
  }

  async update(id: number, item: Role) {
    return axios.patch(`v1/roles/${id}/edit`, item);
  }
}

export const roleService = new RoleService();
