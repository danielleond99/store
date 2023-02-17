import { FC, ReactElement, useEffect, useState } from "react";
import { Input } from "../../app/components/Input";
import { Button } from "../../app/components/Button";
import { Card } from "../../app/components/Card";
import { useSelector } from "react-redux";
import { authSelector, loginUser } from "../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { useFormik } from "formik";
import { IAuthRequest } from "../types";
import * as Yup from "yup";
import { Loading } from "../../app/components/Loading";

const SignupSchema = Yup.object().shape({
  password: Yup.string().required("Campo requerido"),
  user: Yup.string()
    // .matches(
    //     // eslint-disable-next-line security/detect-unsafe-regex
    //   /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
    //   'Formato de correo incorrecto'
    // )
    .required("Campo requerido"),
});

export const LoginPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);
  // let wss;

  const formik = useFormik({
    initialValues: { user: "", password: "" },
    onSubmit: (values: IAuthRequest) => {
      handleLogin(values);
    },
    validationSchema: SignupSchema,
  });

  const { logged, error, loading } = useSelector(authSelector);
  const [showLoading, setShowLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [token, setToken] = useState<string>("");
  const [showDialogNewPassword, setShowDialogNewPassword] = useState(false);
  const { search } = useLocation();

  const handleLogin = (input: IAuthRequest): void => {
    void dispatch(loginUser(input));
  };

  useEffect(() => {
    if (logged) {
      // wss = new WebSocket(
      //   'wss://3p8sanqaw4.execute-api.eu-west-1.amazonaws.com/pre'
      // );
      // wss.onopen = () => {
      //   console.log('Server conectado');
      // };
      // wss.onmessage = (e) => {
      //   console.log(e.data);
      // };
      // wss.onerror = (error) => {
      //   console.log(error);
      // };
      // if (
      //   user?.rol.includes(Roles.FAMILIAR) ||
      //   user?.rol.includes(Roles.Administrador)
      // )
      //   user?.rol.includes(Roles.FAMILIAR)
      //     ? navigate("/dashboard/familiar/promotions", { replace: true })
      //     : navigate("/dashboard", { replace: true });
    }

    // if (error) dispatch(showMessage({ severity: "error", summary: error }));
  }, [logged, error]);

  useEffect(() => {
    if (search?.includes("token")) {
      setShowDialogNewPassword(true);
      const token = search
        .split("?")
        .find((queryParams) => queryParams.includes("token"));
      if (token) {
        const value = token.split("=");
        if (value.length > 1) setToken(value[1]);
      }
    }
  }, [search]);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center h-screen justify-content-center overflow-y-scroll"
      style={
        {
          // backgroundImage: `url(${require("../../../assets/back-cupones.png")})`,
        }
      }
    >
      <Loading show={showLoading} />
      {/* <div className="flex justify-content-center">
        <Image
          imageClassName="h-6rem scalein animation-duration-500"
          src={`${require("../../../assets/logo-alsea-white-01.png")}`}
          alt="Image Text"
        />
      </div> */}
      <div className="flex justify-content-center scalein animation-duration-500">
        <Card
          title={"Bienvenido"}
          style={
            "px-3 pb-2 border-round-xl shadow-7 align-content-center text-center col-10 md:col-5 lg:col-4 xl:col-3"
          }
        >
          <form className="p-fluid mb-0" onSubmit={formik.handleSubmit}>
            <Input
              label={"Correo"}
              // type={'email'}
              name={"user"}
              icon={"pi pi-user"}
              onChange={formik.handleChange}
              value={formik.values.user}
              error={formik.touched.user ? formik.errors.user : undefined}
            />
            <Input
              label={"Contraseña"}
              name={"password"}
              password
              icon={"pi pi-lock"}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
            <Button
              disabled={!formik.isValid || !formik.dirty}
              label={"ENTRAR"}
              icon={"pi pi-sign-in"}
              style={"-mb-3 mt-3 shadow-2"}
              type={"submit"}
              loading={loading}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};
