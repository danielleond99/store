import { FC, ReactElement } from "react";

import * as Yup from "yup";

import { Card } from "../../app/components/Card";
import { useFormik } from "formik";
import { Button } from "../../app/components/Button";
import { Input } from "../../app/components/Input";
import { Loading } from "../../app/components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { InputNum } from "../../app/components/InputNumber";

const SignupSchema = Yup.object().shape({
  code_product: Yup.string().required("Required field"),
  count_product: Yup.string().required("Required field"),
  price_product: Yup.string().required("Required field"),
  sale_type: Yup.string().required("Required field"),
});

export const FormSale: FC = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik<any>({
    initialValues: {
      code_product: "",
      count_product: 0,
      price_product: 0,
      sale_type: "",
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
              ? "Update sale"
              : "Create sale"
          }
        >
          <div className={"grid flex-row"}>
            <Input
              style="col-4"
              required
              value={formik.values.code_product}
              name={"code_product"}
              label={"Code"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <Input
              type="number"
              style="col-4"
              required
              value={formik.values?.count_product?.toString()}
              name={"count_product"}
              label={"Count"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <InputNum
              style="col-4"
              required
              value={formik.values?.price_product?.toString()}
              name={"price_product"}
              label={"Price"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
          </div>
          <div className={"grid flex-row"}>
            <Input
              style="col-4"
              required
              value={formik.values.sale_type}
              name={"sale_type"}
              label={"Sale type"}
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
