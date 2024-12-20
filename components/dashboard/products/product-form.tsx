"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required").min(0),
  stock: Yup.number().required("Stock is required").min(0),
  category: Yup.string().required("Category is required"),
  type: Yup.string().required("Type is required"),
});

interface ProductFormProps {
  onSuccess: () => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        type: "standard",
      }}
      validationSchema={productSchema}
      onSubmit={async (values) => {
        // Handle form submission
        console.log(values);
        onSuccess();
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Field
              as={Input}
              name="name"
              placeholder="Enter product name"
            />
            {errors.name && touched.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Field
              as={Textarea}
              name="description"
              placeholder="Enter product description"
            />
            {errors.description && touched.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price</Label>
              <Field
                as={Input}
                name="price"
                type="number"
                placeholder="Enter price"
              />
              {errors.price && touched.price && (
                <p className="text-sm text-destructive">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>
              <Field
                as={Input}
                name="stock"
                type="number"
                placeholder="Enter stock"
              />
              {errors.stock && touched.stock && (
                <p className="text-sm text-destructive">{errors.stock}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                onValueChange={(value) => setFieldValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="meat">Meat & Poultry</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && touched.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                onValueChange={(value) => setFieldValue("type", value)}
                defaultValue="standard"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && touched.type && (
                <p className="text-sm text-destructive">{errors.type}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit">Save Product</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}