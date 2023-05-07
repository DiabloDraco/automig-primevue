import axios from "@/plugins/axios";

export interface Marking {
  id: number;
  name: string;
  deleted_at?: Date;
}

export interface Markings {
  total: number;
  page_count: number;
  data: Marking[];
}

class MarkingService {
  async find(page: number = 1, perPage: number = 5): Promise<Markings> {
    return axios.get(`v1/markings/page?page=${page}&per_page=${perPage}`);
  }

  async findById(id: number): Promise<Marking> {
    return axios.get(`v1/markings/${id}/edit`);
  }

  async findByName(name: string): Promise<Markings> {
    return axios.get(`v1/markings/filter?name=${name}`);
  }

  async create(marking: Marking): Promise<number> {
    return axios.post(`v1/markings/add`, marking);
  }

  async update(id: number, item: Marking) {
    return axios.patch(`v1/markings/${id}/edit`, item);
  }

  async delete(id: number) {
    return axios.delete(`v1/markings/${id}/remove`);
  }
}

export const markingService = new MarkingService();
