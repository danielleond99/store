import { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../page/LoginPage";
import { RegisterPage } from "../page/RegisterPage";

export const AuthRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate replace to="login" />} />
    </Routes>
  );
};

export default AuthRouter;
