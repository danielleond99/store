import { AxiosResponse } from "axios";
import { IAuthRequest, IAuthResponse } from "../types";
import { customAxiosAppAuth } from "../../shared/axiosConfig";
import { BaseCrudService } from "../../shared/baseCrud";

class AuthServices extends BaseCrudService {
  constructor() {
    super(customAxiosAppAuth, "auth/login");
  }
  login(input: IAuthRequest): Promise<AxiosResponse<IAuthResponse>> {
    return customAxiosAppAuth.post("auth/token", input);
  }
}
const authServices = new AuthServices();
export default authServices;
