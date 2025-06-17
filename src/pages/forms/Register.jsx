import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../../apis/auth.api";
import { useRef, useState } from "react";
import { useEffect } from "react";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Button from "../../components/shared/button";

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const message = params.get("message");
  const hasShownToast = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (message === "error" && !hasShownToast.current) {
      toast.success("Token invalide ! Veuillez vous réinscrire");
      hasShownToast.current = true;
      navigate("/register", { replace: true });
    }
  }, [message, navigate]);
  const schema = yup.object({
    username: yup
      .string()
      .required("Veuillez entrer votre nom.")
      .min(2, "Le nom doit contenir au moins 2 caractères.")
      .matches(
        /^[a-zA-ZÀ-ÿ '-]+$/,
        "Le nom ne peut contenir que des lettres et des espaces"
      ),
    email: yup
      .string()
      .email()
      .required("Le champ est obligatoire")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Format de votre email non valide"
      ),
    password: yup
      .string()
      .required("Mot de passe requis")
      .min(8, "Minimum 8 caractères")
      .matches(/[a-z]/, "Doit contenir une minuscule")
      .matches(/[A-Z]/, "Doit contenir une majuscule")
      .matches(/\d/, "Doit contenir un chiffre")
      .matches(/[^A-Za-z0-9]/, "Doit contenir un catactère spécial"),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passes ne correspondent pas"
      ),
    rgpd: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et conditions"),
  });

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rgpd: false,
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
    console.log(values);
    try {
      const feedback = await signup(values);
      if (!feedback.message) {
        reset(defaultValues);
        toast.success(feedback.messageOk);
        navigate("/login");
      } else {
        toast.error(feedback.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-24 max-sm:p-8">
      <div className="flex flex-col gap-2.5 py-9 justify-center items-center max-sm:w-full max-sm:py-5">
        <img
          src={logo}
          alt="Logo"
          className="w-25 h-25 max-sm:w-19 max-sm:h-19"
        />
        <h2 className="text-gold font-title text-[40px] font-semibold leading-[52px] max-sm:text-[26px] max-sm:leading-8.5">
          Inscription
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col max-sm:w-full max-sm:items-center"
      >
        {/* input username */}
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start min-w-[260px]">
          <label
            htmlFor="username"
            className="text-white text-[28px] leading-[37px] font-title max-sm:text-lg max-sm:leading-[23px] "
          >
            Pseudo
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="h-[35px] rounded-[5px] bg-bg-input border-[1px] border-borderGold w-full text-white px-2"
          />
          {errors.username && (
            <p className="text-red">{errors.username.message}</p>
          )}
        </div>
        {/* input email */}
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start min-w-[260px]">
          <label
            htmlFor="email"
            className="text-white text-[28px] leading-[37px] font-title max-sm:text-lg max-sm:leading-[23px]"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="h-[35px] rounded-[5px] bg-bg-input border-[1px] border-borderGold w-full text-white px-2"
          />
          {errors.email && (
            <p className="relative text-red">{errors.email.message}</p>
          )}
        </div>
        {/* Input password */}
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start min-w-[260px]">
          <label
            htmlFor="password"
            className="text-white text-[28px] leading-[37px] font-title max-sm:text-lg max-sm:leading-[23px]"
          >
            Mot de passe
          </label>
          <div className="relative w-full">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              className="h-[35px] rounded-[5px] bg-bg-input border-[1px] border-borderGold w-full text-white px-2"
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
        {/* Input confirmPassword */}
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start min-w-[260px]">
          <label
            htmlFor="confirmPassword"
            className="text-white text-[28px] leading-[37px] font-title max-sm:text-lg max-sm:leading-[23px]"
          >
            Confirmation du mot de passe
          </label>
          <div className="relative w-full">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="h-[35px] rounded-[5px] bg-bg-input border-[1px] border-borderGold w-full text-white px-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 text-sm text-white hover:text-gold right-2"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red">{errors.confirmPassword.message}</p>
          )}
        </div>
        {/* GDPR Consent checkbox */}
        <div className="p-2.5 justify-start flex flex-col items-start min-w-[260px]">
          <label
            htmlFor="rgpd"
            className="flex items-center gap-2.5 cursor-pointer text-white"
          >
            <input
              type="checkbox"
              className="sr-only peer"
              id="rgpd"
              {...register("rgpd")}
            />
            <div className="flex items-center justify-center w-5 h-5 transition border-[1px] border-gold rounded-[5px]  bg-primary-darker peer-checked:text-gold bg-bg-input text-bg-input">
              <svg
                className="w-4 h-4 "
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="max-sm:text-[11px]">
              J'accepte la
              <span className="text-gold hover:underline">
                {" "}
                politique de confidentialité
              </span>
            </span>
          </label>
          {errors.rgpd && (
            <p className="w-full text-red">{errors.rgpd.message}</p>
          )}
        </div>
        {/* Button register */}
        <div className="min-w-[260px] p-2.5">
          <Button txt="S'inscrire" />
        </div>
      </form>
    </div>
  );
}
