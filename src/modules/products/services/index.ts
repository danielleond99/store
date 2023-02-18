import customAxiosApp from "../../shared/axiosConfig";
import { BaseCrudService } from "../../shared/baseCrud";

export class ProductsServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, 'product');
  }
}

const productsService = new ProductsServices();
export default productsService;
