import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPassword } from "../../../apis/auth.api";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";

export default function ForgotPassword() {
  const schema = yup.object({
    email: yup
      .string()
      .email("Format non valide")
      .required("Le champ est obligatoire")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Format de votre email non valide"
      ),
  });

  const defaultValues = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function submit(values) {
    // console.log(values); { email: "john@test.fr"}
    const response = await forgotPassword(values);
    console.log(response); // { message: "bien reçu"}
    toast.success(response.message);
  }
  return (
    <div className="flex items-center justify-center flex-1">
      <img
        src={logo}
        alt="Logo"
        className="w-25 h-25 max-sm:w-19 max-sm:h-19"
      />

      <h2 className="font-title text-[40px] leading-[52px] text-gold font-semibold max-sm:text-[26px] max-sm:leading-[34px]">
        Connexion
      </h2>
      <div className="w-full max-w-md p-6 bg-white rounded shadow-xl">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4 mb-6 mx-auto max-w-[400px]"
        >
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="px-3 py-2 border border-gray-300 rounded outline-none focus: focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <button className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
