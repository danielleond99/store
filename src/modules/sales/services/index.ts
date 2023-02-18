import customAxiosApp from "../../shared/axiosConfig";
import { BaseCrudService } from "../../shared/baseCrud";

export class SalesServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, "sales");
  }
}

const salesService = new SalesServices();
export default salesService;
