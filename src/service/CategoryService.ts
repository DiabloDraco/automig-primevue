import axios from "@/plugins/axios";
export interface Category {
  id: number;
  name: string;
  deleted_at?: Date;
}

export interface Categories {
  total: number;
  page_count: number;
  data: Category[];
}

class CategoryService {
  async find(page: number = 1, perPage: number = 5): Promise<Categories> {
    return axios.get(`v1/categories/page?page=${page}&per_page=${perPage}`);
  }

  async findById(id: number): Promise<Category> {
    return axios.get(`v1/categories/${id}/edit`);
  }

  async findByName(name: string): Promise<Categories> {
    return axios.get(`v1/categories/filter?name=${name}`);
  }

  async create(product: Category): Promise<number> {
    return axios.post(`v1/categories/add`, product);
  }

  async update(id: number, item: Category) {
    return axios.patch(`v1/categories/${id}/edit`, item);
  }

  async delete(id: number) {
    return axios.delete(`v1/categories/${id}/remove`);
  }
}

export const categoryService = new CategoryService();
