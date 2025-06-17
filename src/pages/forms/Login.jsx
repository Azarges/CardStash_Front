import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { signin } from "../../apis/auth.api";
import { useEffect } from "react";
import { useRef } from "react";
import logo from "../../assets/logo.png";
import Button from "../../components/shared/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [params] = useSearchParams();
  const message = params.get("message");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (message === "success" && !hasShownToast.current) {
      toast.success("Inscription Validée ! Vous pouvez vous connecter");
      hasShownToast.current = true;
      navigate("/login", { replace: true });
    }
  }, [message, navigate]);
  const schema = yup.object({
    email: yup
      .string()
      .email()
      .required("Le champ est obligatoire")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Format de votre email non valide"
      ),
    password: yup.string().required("Mot de passe requis"),
  });

  const defaultValues = {
    email: "",
    password: "",
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
    console.log(values);
    try {
      const response = await signin(values);
      console.log(response);

      if (!response.message) {
        reset(defaultValues);
        toast.success("Connexion réussie");
        login(response);
        navigate("/");
      } else {
        toast.error("Connexion échouée");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex-col flex justify-center items-center gap-2.5 max-sm:py-8 max-sm:px-4 py-8">
      <img
        src={logo}
        alt="Logo"
        className="w-25 h-25 max-sm:w-19 max-sm:h-19"
      />

      <h2 className="font-title text-[40px] leading-[52px] text-gold font-semibold max-sm:text-[26px] max-sm:leading-[34px]">
        Connexion
      </h2>
      <div className="flex items-center justify-center flex-1">
        {/* Login form */}
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col mx-auto mb-6"
        >
          {/* Input email */}
          <div className="flex flex-col gap-2.5 p-2.5">
            <label
              htmlFor="email"
              className="text-white font-title text-[28px] leading-[37px] max-sm:leading-[23px] max-sm:text-[18px]"
            >
              Adresse e-mail
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="border-[1px] border-gold rounded-[5px] bg-bg-input h-9 text-white pl-2.5 max-sm:w-[260px] w-80"
            />
            {errors.email && <p className="text-red">{errors.email.message}</p>}
          </div>
          {/* input password */}
          <div className="flex flex-col  gap-2.5 p-2.5">
            <label
              htmlFor="password"
              className="text-white font-title text-[28px] leading-[37px] max-sm:leading-[23px] max-sm:text-[18px]"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className="border-[1px] border-gold rounded-[5px]  bg-bg-input h-9 text-white pl-2.5 pr-20 max-sm:w-[260px] w-80"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 text-sm text-white hover:text-gold right-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red">{errors.password.message}</p>
            )}
          </div>
          {/* Forgot password */}
          <NavLink
            to="/forgot"
            className="text-white  p-2.5 leading-[19px] hover:underline max-sm:leading-[14px] max-sm:text-[14px]"
          >
            Mot de passe oublié ?
          </NavLink>
          {/* Login button */}
          <div className=" p-2.5">
            <Button txt="Se connecter" />
          </div>
          {/* Register redirection */}
          <span className=" p-2.5 text-white leading-[19px] max-sm:leading-[14px] max-sm:text-[14px]">
            Premère visite ?{" "}
            <NavLink to="/register" className="text-gold hover:underline">
              Créer un compte
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}
