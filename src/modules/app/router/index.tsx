import { FC, lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useSelector } from "react-redux";
import { authSelector } from "../../auth/redux";
import { Navigate } from "react-router";
import { PrivateRoute } from "./PrivateRoute";

const AuthRouter = lazy(() => import("../../auth/router"));
const HomeRouter = lazy(() => import("../../home/router"));

export const AppRouter: FC = (): ReactElement => {
  const { user, logged } = useSelector(authSelector);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={<Loading show={true} />}>
              <AuthRouter />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute isAllowed={!!user && logged}>
              <Suspense fallback={<Loading show={true} />}>
                <HomeRouter />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
