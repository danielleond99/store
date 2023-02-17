import { AxiosResponse } from "axios";
import { IAuthRequest, IAuthResponse } from "../types";
import { customAxiosAppAuth } from "../../shared/axiosConfig";

class AuthServices {
  login(input: IAuthRequest): Promise<AxiosResponse<IAuthResponse>> {
    return customAxiosAppAuth.post("auth/token", input);
  }
}
const authServices = new AuthServices();
export default authServices;
