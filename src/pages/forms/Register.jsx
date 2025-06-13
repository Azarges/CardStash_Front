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
    username: yup.string().required("Le champ est obligatoire"),
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
    mode: "onChange",
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
    <div className="flex flex-col items-center justify-center pt-16 pb-24">
      <div className="flex flex-col gap-2.5 py-9 justify-center items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-25 h-25 max-sm:w-19 max-sm:h-19"
        />
        <h2 className="text-gold font-title text-[40px] font-semibold leading-[52px]">
          Inscription
        </h2>
      </div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start">
          <label
            htmlFor="username"
            className="text-white text-[28px] leading-[37px] font-title"
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
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start">
          <label
            htmlFor="email"
            className="text-white text-[28px] leading-[37px] font-title"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="h-[35px] rounded-[5px] bg-bg-input border-[1px] border-borderGold w-full text-white px-2"
          />
          {errors.email && <p className="text-red">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start">
          <label
            htmlFor="password"
            className="text-white text-[28px] leading-[37px] font-title"
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
        <div className="flex flex-col gap-2.5 p-2.5 justify-start items-start">
          <label
            htmlFor="confirmPassword"
            className="text-white text-[28px] leading-[37px] font-title"
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

        <div className="p-2.5 justify-start flex flex-col">
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
            <div className="flex items-center justify-center w-6 h-6 transition border-[1px] border-gold rounded-[5px]  bg-primary-darker peer-checked:text-gold bg-bg-input text-bg-input">
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
            <span className="">
              J'accepte la
              <span className="text-gold hover:underline">
                {" "}
                politique de confidentialité
              </span>
            </span>
          </label>
          {errors.rgpd && <p className="text-red">{errors.rgpd.message}</p>}
        </div>

        <Button txt="S'inscrire" />
      </form>
    </div>
  );
}
