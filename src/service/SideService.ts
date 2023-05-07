import axios from "@/plugins/axios";

export interface Side {
  id: number;
  name: string;
  deleted_at?: Date;
}

export interface Sides {
  total: number;
  page_count: number;
  data: Side[];
}

class SideService {
  async find(page: number = 1, perPage: number = 5): Promise<Sides> {
    return axios.get(`v1/sides/page?page=${page}&per_page=${perPage}`);
  }

  async findById(id: number): Promise<Side> {
    return axios.get(`v1/sides/${id}/edit`);
  }

  async findByName(name: string): Promise<Sides> {
    return axios.get(`v1/sides/filter?name=${name}`);
  }

  async create(side: Side): Promise<number> {
    return axios.post(`v1/sides/add`, side);
  }

  async update(id: number, item: Side) {
    return axios.patch(`v1/sides/${id}/edit`, item);
  }

  async delete(id: number) {
    return axios.delete(`v1/sides/${id}/remove`);
  }
}

export const sideService = new SideService();
