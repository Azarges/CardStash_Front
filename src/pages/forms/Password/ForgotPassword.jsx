import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPassword } from "../../../apis/auth.api";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";
import Button from "../../../components/shared/button";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  const schema = yup.object({
    email: yup
      .string()
      .email()
      .required("Veuillez entrer votre adresse e-mail.")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Format de votre email non valide."
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
    mode: "onSubmit",
  });

  async function submit(values) {
    const response = await forgotPassword(values);
    console.log(response); // { message: "bien reçu"}
    toast.success(response.message);
    reset();
  }
  return (
    <div className="flex flex-col items-center justify-center flex-1 max-sm:px-5 max-sm:py-7.5 gap-2.5">
      <div className="flex flex-col gap-2.5 py-12 justify-center items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-25 h-25 max-sm:w-19 max-sm:h-19"
        />

        <h2 className="font-title text-[40px] leading-[52px] text-gold font-semibold max-sm:text-[26px] max-sm:leading-[34px]">
          Mot de passe oublié ?
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-2.5 items-center"
      >
        <div className="flex flex-col gap-2.5 p-2.5">
          <label
            htmlFor="email"
            className="text-white font-title text-[28px] leading-[37px] max-sm:text-[18px] max-sm:leading-[23px]"
          >
            Adresse e-mail
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="h-[35px] w-75 rounded-[5px] bg-bg-input border-1 border-borderGold p-2.5 text-white max-sm:w-auto"
          />
          {errors.email && (
            <p className="text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px]">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col text-white leading-[19px] max-sm:text-[14px] max-sm:leading-[17px] p-2.5">
          <p>Vous avez besoin d'aide supplémentaire ?</p>
          <p>
            Contactez nous via notre{" "}
            <NavLink to="/" className="underline">
              système de support
            </NavLink>
          </p>
        </div>
        <Button txt="Démarrer" />
      </form>
    </div>
  );
}
