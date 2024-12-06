"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: Yup.string()
    .email("Insira um email válido")
    .required("O email é obrigatório"),
  message: Yup.string()
    .required("A mensagem é obrigatória")
    .min(10, "A mensagem deve ter no mínimo 10 caracteres"),
});

export default function ContactForm() {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        alert("Mensagem enviada com sucesso!");
        resetForm();
      }}
    >
      {({ touched, errors }) => (
        <Form className="bg-[#FAFAFA] shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#333333]"
            >
              Nome:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className={`mt-1 block w-full border rounded-md p-2 focus:outline-none ${
                touched.name && errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Seu nome"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#333333]"
            >
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className={`mt-1 block w-full border rounded-md p-2 focus:outline-none ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Seu email"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#333333]"
            >
              Mensagem:
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              className={`mt-1 block w-full border rounded-md p-2 focus:outline-none ${
                touched.message && errors.message
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              rows={4}
              placeholder="Sua mensagem"
            />
            <ErrorMessage
              name="message"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-[#F5A623] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#FBBF24] transition-colors"
          >
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
}
