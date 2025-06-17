import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "../../../apis/auth.api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";
import Button from "../../../components/shared/button";

export default function ResetPassword() {
  const { token } = useParams();
  console.log(token);

  const navigate = useNavigate();
  const schema = yup.object({
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "trop court")
      .max(10, "trop long"),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passes ne correspondent pas"
      ),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
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
    console.log(values); // { password: azerty, confirmPassword: azerty}

    const response = await resetPassword({
      password: values.password,
      token: token,
    });

    //  objet qu'on envoie { password: azerty, token :azqdesfgxhcgfds...}
    console.log(response);
    if (response.messageOk) {
      toast.success(response.messageOk);
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="flex flex-col gap-2.5 py-12 justify-center items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-25 h-25 max-sm:w-19 max-sm:h-19"
        />

        <h2 className="font-title text-[40px] leading-[52px] text-gold font-semibold max-sm:text-[26px] max-sm:leading-[34px] max-sm:px-5 max-sm:text-center">
          Réinitialisation du mot de passe
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col  gap-2.5 p-2.5 w-[345px] max-sm:w-70">
          <label
            htmlFor="password"
            className="text-white font-title text-[28px] leading-[37px] max-sm:text-[18px] max-sm:leading-[23px] w-full"
          >
            Mot de passe
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="h-[35px] w-75 rounded-[5px] bg-bg-input border-1 border-borderGold p-2.5 text-white max-sm:w-auto"
          />
          {errors.password && (
            <p className="text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px] w-full">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col p-2.5 gap-2.5 w-[345px] max-sm:w-70">
          <label
            htmlFor="confirmPassword"
            className="text-white font-title text-[28px] leading-[37px] max-sm:text-[18px] max-sm:leading-[23px] w-full"
          >
            Confirmation du mot de passe
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="h-[35px] w-75 rounded-[5px] bg-bg-input border-1 border-borderGold p-2.5 text-white max-sm:w-auto"
          />
          {errors.confirmPassword && (
            <p className="text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="w-75 p-2.5 max-sm:w-70 mb-8">
          <Button txt="Définir le mode de passe" />
        </div>
      </form>
    </div>
  );
}
