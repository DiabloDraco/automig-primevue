import axios from "@/plugins/axios";

export interface Product {
  name: string;
  description: string;
  category_id: number;
  codes: string[];
  country_ids: number[];
  markings_ids: number[];
  models_ids: number[];
  sides_ids: number[];
}

export interface Produtcs {
  total: number;
  page_count: number;
  data: Product[];
}

class ProductService {
  async find(page: number = 1, perPage: number = 5): Promise<Produtcs> {
    return axios.get(`v1/products/page?page=${page}&per_page=${perPage}`);
  }

  async findById(id: number): Promise<Product> {
    return axios.get(`v1/products/${id}/edit`);
  }

  async findByName(name: string): Promise<Produtcs> {
    return axios.get(`v1/products/filter?name=${name}`);
  }

  async create(product: Product): Promise<number> {
    return axios.post(`v1/products/add`, product);
  }

  async update(id: number, item: Product) {
    return axios.patch(`v1/products/${id}/edit`, item);
  }

  async delete(id: number) {
    return axios.delete(`v1/products/${id}/remove`);
  }
}

export const productService = new ProductService();
