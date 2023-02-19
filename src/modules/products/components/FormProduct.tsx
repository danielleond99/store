import { FC, ReactElement, useEffect, useState } from "react";

import * as Yup from "yup";

import { Card } from "../../app/components/Card";
import { useFormik } from "formik";
import { Button } from "../../app/components/Button";
import { Input } from "../../app/components/Input";
import { Loading } from "../../app/components/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../types/index";
import { InputNum } from "../../app/components/InputNumber";
import { useAppDispatch } from "../../app/store/index";
import { createProduct } from "../redux";
import { useSelector } from "react-redux";
import { productsSelector, getProductById } from "../redux/index";
import { showMessage } from "../../shared/redux/message";

const SignupSchema = Yup.object().shape({
  code_product: Yup.string().required("Required field"),
  id_store: Yup.string().required("Required field"),
  name_product: Yup.string().required("Required field"),
  price_product: Yup.number().min(1).required("Required field"),
  stock_product: Yup.number().min(1).required("Required field"),
});

export const FormProduct: FC = (): ReactElement => {
  const disptach = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { loadingProducts } = useSelector(productsSelector);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    if (productId)
      disptach(getProductById(productId))
        .unwrap()
        .then((product) => {
          setProduct(product);
        })
        .catch((error) => {
          disptach(
            showMessage({
              severity: "error",
              summary: error.response.data.message,
            })
          );
        });
  }, [productId]);

  const formik = useFormik<IProduct>({
    initialValues: {
      code_product: product?.code_product || "",
      id_store: product?.id_store || "",
      name_product: product?.name_product || "",
      price_product: product?.price_product || 1,
      stock_product: product?.stock_product || 1,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="pt-3">
      <Loading show={loadingProducts} />
      <form>
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
              name={"code_product"}
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
              name={"name_product"}
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
              onChange={(e: any) => {
                void formik.setFieldTouched("price_product", true);
                void formik.setFieldValue("price_product", e.value);
              }}
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
            // onClick={() => console.log(formik.values)}
            onClick={() => disptach(createProduct(formik.values))}
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
