import { FC, ReactElement } from "react";

import * as Yup from "yup";

import { Card } from "../../app/components/Card";
import { useFormik } from "formik";
import { Button } from "../../app/components/Button";
import { Input } from "../../app/components/Input";
import { Loading } from "../../app/components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { IProducts } from "../types/index";
import { InputNum } from "../../app/components/InputNumber";

const SignupSchema = Yup.object().shape({
  code_product: Yup.string().required("Required field"),
  id_store: Yup.string().required("Required field"),
  name_product: Yup.string().required("Required field"),
  price_product: Yup.string().required("Required field"),
  stock_product: Yup.string().required("Required field"),
});

export const FormProduct: FC = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik<IProducts>({
    initialValues: {
      code_product: "",
      id_store: "",
      name_product: "",
      price_product: 0,
      stock_product: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="pt-3">
      <Loading show={false} />
      <form onSubmit={formik.handleSubmit}>
        <Card
          style={"mx-3 shadow-3"}
          title={
            location.pathname.split("/").at(-1) === "edit"
              ? "Update product"
              : "Create product"
          }
        >
          <div className={"grid flex-row"}>
            <Input
              style="col-4"
              required
              value={formik.values.code_product}
              name={"values"}
              label={"Code"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <Input
              style="col-4"
              required
              value={formik.values.id_store}
              name={"id_store"}
              label={"Store"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <Input
              style="col-4"
              required
              value={formik.values.name_product}
              name={"values"}
              label={"Name"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
          </div>
          <div className={"grid flex-row"}>
            <InputNum
              style="col-4"
              required
              value={formik.values.price_product}
              name={"price_product"}
              label={"Price"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <Input
              type="number"
              style="col-4"
              required
              value={formik.values.stock_product}
              name={"stock_product"}
              label={"Stock"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
          </div>
        </Card>
        <div className={"grid flex-row mt-3 mr-3 justify-content-end"}>
          <Button
            type="button"
            style={"mr-3"}
            label="Finalizar"
            icon={"pi pi-check"}
            onClick={() => navigate(-1)}
          />
          <Button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            label="Guardar"
            icon={"pi pi-save"}
          />
        </div>
      </form>
    </div>
  );
};
