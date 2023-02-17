import { FC, lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useSelector } from "react-redux";
import { authSelector } from "../../auth/redux";

const AuthRouter = lazy(() => import("../../auth/router"));
// const HomeRouter = lazy(() => import("../../home/router"));

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
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
