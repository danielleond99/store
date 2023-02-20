import { FC, ReactElement, useEffect } from "react";

import * as Yup from "yup";

import { Card } from "../../app/components/Card";
import { useFormik } from "formik";
import { Button } from "../../app/components/Button";
import { Input } from "../../app/components/Input";
import { Loading } from "../../app/components/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  salesSelector,
  createSale,
  getSaleById,
  editSale,
} from "../redux/index";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { ISale } from "../types/index";
import { showMessage } from "../../shared/redux/message";

const SignupSchema = Yup.object().shape({
  code_product: Yup.string().required("Required field"),
  count_product: Yup.number().min(1).required("Required field"),
  type_of_sale: Yup.number().required("Required field"),
});

export const FormSale: FC = (): ReactElement => {
  const disptach = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { saleId } = useParams();

  const { loadingSales } = useSelector(salesSelector);

  useEffect(() => {
    if (saleId)
      disptach(getSaleById(saleId))
        .unwrap()
        .then((sale) => {
          formik.setValues({ ...sale });
        })
        .catch((error) => {
          disptach(
            showMessage({
              severity: "error",
              summary: error?.response?.data?.message,
            })
          );
        });
  }, [saleId]);

  const formik = useFormik<ISale>({
    initialValues: {
      code_product: "",
      count_product: 1,
      type_of_sale: 1,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="pt-3">
      <Loading show={loadingSales} />
      <form>
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
              value={formik.values?.count_product}
              name={"count_product"}
              label={"Count"}
              icon={"pi pi-info-circle"}
              onChange={formik.handleChange}
            />
            <Input
              type="number"
              style="col-4"
              required
              value={formik.values.type_of_sale}
              name={"type_of_sale"}
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
            // onClick={() => console.log(formik.values)}
            onClick={() =>
              saleId
                ? disptach(editSale({ values: formik.values, saleId }))
                    .unwrap()
                    .then(() => navigate(-1))
                : disptach(createSale(formik.values))
                    .unwrap()
                    .then(() => formik.resetForm())
            }
            disabled={!formik.isValid || !formik.dirty}
            type="button"
            label="Guardar"
            icon={"pi pi-save"}
          />
        </div>
      </form>
    </div>
  );
};
