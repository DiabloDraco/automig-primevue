import axios from "@/plugins/axios";

export interface Country {
  id: number;
  name: string;
  deleted_at?: Date;
}

export interface Countries {
  total: number;
  page_count: number;
  data: Country[];
}

class CountryService {
  async find(page: number = 1, perPage: number = 5): Promise<Countries> {
    return axios.get(`v1/countries/page?page=${page}&per_page=${perPage}`);
  }

  async findById(id: number): Promise<Country> {
    return axios.get(`v1/countries/${id}/edit`);
  }

  async findByName(name: string): Promise<Countries> {
    return axios.get(`v1/countries/filter?name=${name}`);
  }

  async create(country: Country): Promise<number> {
    return axios.post(`v1/countries/add`, country);
  }

  async update(id: number, item: Country) {
    return axios.patch(`v1/countries/${id}/edit`, item);
  }

  async delete(id: number) {
    return axios.delete(`v1/countries/${id}/remove`);
  }
}

export const countryService = new CountryService();
