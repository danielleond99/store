import { FC, ReactElement, useEffect } from "react";
import { Input } from "../../app/components/Input";
import { Button } from "../../app/components/Button";
import { Card } from "../../app/components/Card";
import { useSelector } from "react-redux";
import { authSelector, loginUser } from "../redux";
import { useAppDispatch } from "../../app/store";
import { useFormik } from "formik";
import { IAuthRequest } from "../types";
import * as Yup from "yup";
import { Loading } from "../../app/components/Loading";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  user_name: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
});

export const LoginPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { user_name: "", password: "" },
    onSubmit: (values: IAuthRequest) => {
      handleLogin(values);
    },
    validationSchema: SignupSchema,
  });

  const { logged, loading } = useSelector(authSelector);

  const handleLogin = (input: IAuthRequest): void => {
    void dispatch(loginUser(input));
  };

  useEffect(() => {
    if (logged) {
      navigate("/dashboard", { replace: true });
    }
  }, [logged]);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center h-screen justify-content-center align-items-center overflow-y-scroll bg-primary-100"
      style={
        {
          // backgroundImage: `url(${require("../../../assets/back-cupones.png")})`,
        }
      }
    >
      <Loading show={loading} />
      <div className="flex justify-content-center align-items-center scalein animation-duration-500 h-screen w-screen">
        <Card
          title={"Welcome"}
          // eslint-disable-next-line react/style-prop-object
          style={
            "border-round-xl shadow-7 -mt-8 text-center col-10 md:col-5 lg:col-4 xl:col-3"
          }
        >
          <form className="p-fluid mb-0" onSubmit={formik.handleSubmit}>
            <Input
              label={"Username"}
              name={"user_name"}
              icon={"pi pi-user"}
              onChange={formik.handleChange}
              value={formik.values.user_name}
              error={
                formik.touched.user_name ? formik.errors.user_name : undefined
              }
            />
            <Input
              label={"Password"}
              name={"password"}
              password
              icon={"pi pi-lock"}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
            <div className="flex justify-content-end">
              <span
                className={"text-primary font-semibold cursor-pointer mb-3"}
                onClick={() => {
                  navigate("/auth/register");
                }}
              >
                Don't have an account yet? Register
              </span>
            </div>
            <Button
              disabled={!formik.isValid || !formik.dirty}
              label={"Login"}
              icon={"pi pi-sign-in"}
              type={"submit"}
              loading={loading}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};
