import axios from "@/plugins/axios";

export interface Type {
  id: number;
  name: string;
  deleted_at?: Date;
}

export interface Types {
  total: number;
  page_count: number;
  data: Type[];
}

class TypeService {
  async find(page: number = 1, perPage: number = 5): Promise<Types> {
    return axios.get(`v1/models/page?page=${page}&per_page=${perPage}`);
  }

  async findById(id: number): Promise<Type> {
    return axios.get(`v1/models/${id}/edit`);
  }

  async findByName(name: string): Promise<Types> {
    return axios.get(`v1/models/filter?name=${name}`);
  }

  async create(type: Type): Promise<number> {
    return axios.post(`v1/models/add`, type);
  }

  async update(id: number, item: Type) {
    return axios.patch(`v1/models/${id}/edit`, item);
  }

  async delete(id: number) {
    return axios.delete(`v1/models/${id}/remove`);
  }
}

export const typeService = new TypeService();
