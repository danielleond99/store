import { FC, ReactElement, useEffect } from "react";
import { Input } from "../../app/components/Input";
import { Button } from "../../app/components/Button";
import { Card } from "../../app/components/Card";
import { useSelector } from "react-redux";
import { authSelector, registerUser } from "../redux";
import { useAppDispatch } from "../../app/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loading } from "../../app/components/Loading";
import { IRegisterRequest } from "../types/index";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  user_name: Yup.string()
    .required("Required field")
    .min(5, "Must have a minimum of 5 characters"),
  fullName: Yup.string()
    .required("Required field")
    .min(5, "Must have a minimum of 5 characters"),
  password: Yup.string()
    .required("Required field")
    .min(5, "Must have a minimum of 5 characters"),
});

export const RegisterPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { user_name: "", fullName: "", password: "" },
    onSubmit: (values: IRegisterRequest) => {
      handleRegister(values);
    },
    validationSchema: SignupSchema,
  });

  const { logged, loading } = useSelector(authSelector);

  const handleRegister = (input: IRegisterRequest): void => {
    void dispatch(registerUser(input));
  };

  useEffect(() => {
    if (logged) {
      console.log();

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
          title={"Register"}
          // eslint-disable-next-line react/style-prop-object
          style={
            "border-round-xl shadow-7 -mt-8 text-center col-10 md:col-5 lg:col-4 xl:col-3"
          }
        >
          <form className="p-fluid mb-0" onSubmit={formik.handleSubmit}>
            <Input
              label={"Username (minimum of 5 characters)"}
              name={"user_name"}
              icon={"pi pi-user"}
              onChange={formik.handleChange}
              value={formik.values.user_name}
              error={
                formik.touched.user_name ? formik.errors.user_name : undefined
              }
            />
            <Input
              label={"Fullname (minimum of 5 characters)"}
              name={"fullName"}
              icon={"pi pi-user"}
              onChange={formik.handleChange}
              value={formik.values.fullName}
              error={
                formik.touched.fullName ? formik.errors.fullName : undefined
              }
            />
            <Input
              label={"Password (minimum of 5 characters)"}
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
                  navigate("/auth/login");
                }}
              >
                Already have an account? login
              </span>
            </div>
            <Button
              disabled={!formik.isValid || !formik.dirty}
              label={"Signup"}
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
