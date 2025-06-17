import Button from "../../components/shared/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
export default function Contact() {
  const schema = yup.object({
    username: yup
      .string()
      .required("Veuillez entrer votre nom.")
      .min(2, "Le nom doit contenir au moins 2 caractères.")
      .matches(
        /^[a-zA-ZÀ-ÿ '-]+$/,
        "Le nom ne peut contenir que des lettres et des espaces."
      ),
    email: yup
      .string()
      .email()
      .required("Veuillez entrer votre adresse e-mail.")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Format de votre email non valide."
      ),
    object: yup
      .string()
      .required("Veuillez indiquer l'objet de votre message.")
      .min(3, "L'object doit contenir au moins 3 caratères."),
    message: yup
      .string()
      .min(10, "Votre message doit contenir au moins 10 caractères."),
    authorization: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les conditions pour continuer."),
  });

  const defaultValues = {
    username: "",
    email: "",
    object: "",
    message: "",
    authorization: false,
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
    toast.success(
      "Votre message à été envoyé ! Nous vous répondons dans les plus bref délais."
    );
    reset();
  }

  return (
    <div className="flex flex-col gap-6 justify-center items-center p-8 rounded-[5px] bg-bg-section border-1 border-borderGold min-xl:w-6xl m-auto">
      <p className="text-white text-[28px] leading-[37px] font-title max-sm:text-lg max-sm:leading-[23px]">
        Une question ? Une suggestion ?
      </p>
      <p className="text-white text-[28px] leading-[37px] font-title max-sm:text-lg max-sm:leading-[23px]">
        Contactez nous grâce au formulaire ci-dessus !
      </p>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center w-full gap-6"
      >
        {/* Input username + email */}
        <div className="flex items-center justify-center w-full gap-6 max-xl:flex-col">
          {/* input username */}
          <div className="flex flex-col gap-2.5 justify-center items-start w-1/2 max-xl:w-full">
            <label
              htmlFor="username"
              className="text-gold leading-[19px] max-sm:text-[14px] max-sm:leading-[17px]"
            >
              Nom
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className="h-[35px] flex items-center justify-start p-2.5 rounded-[5px] border-1 border-borderGold placeholder:text-placeholder text-white w-full max-sm:placeholder:text-[11px] max-sm:placeholder:leading-[13px] placeholder:text-[13px] placeholder:leading-[16px]"
              placeholder="Jean Dupont"
            />
            {errors.username && (
              <p className="text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px]">
                {errors.username.message}
              </p>
            )}
          </div>
          {/* input email */}
          <div className="flex flex-col gap-2.5 justify-center items-start w-1/2 max-xl:w-full">
            <label
              htmlFor="email"
              className="text-gold leading-[19px] max-sm:text-[14px] max-sm:leading-[17px]"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="h-[35px] flex items-center justify-start p-2.5 rounded-[5px] border-1 border-borderGold placeholder:text-placeholder text-white w-full max-sm:placeholder:text-[11px] max-sm:placeholder:leading-[13px] placeholder:text-[13px] placeholder:leading-[16px]"
              placeholder="jean.dupont@email.com"
            />
            {errors.email && (
              <p className="flex flex-wrap text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px]">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        {/* Input Object */}
        <div className="flex flex-col gap-2.5 justify-center items-start w-full">
          <label
            htmlFor="object"
            className="text-gold leading-[19px] max-sm:text-[14px] max-sm:leading-[17px]"
          >
            Object
          </label>
          <input
            {...register("object")}
            type="text"
            id="object"
            className="h-[35px] flex items-center justify-start p-2.5 rounded-[5px] border-1 border-borderGold placeholder:text-placeholder text-white w-full max-sm:placeholder:text-[11px] max-sm:placeholder:leading-[13px] placeholder:text-[13px] placeholder:leading-[16px]"
            placeholder="Objet de votre demande"
          />
          {errors.object && (
            <p className="text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px]">
              {errors.object.message}
            </p>
          )}
        </div>
        {/* Input Message */}
        <div className="flex flex-col gap-2.5 justify-center items-start w-full">
          <label
            htmlFor="message"
            className="text-gold leading-[19px] max-sm:text-[14px] max-sm:leading-[17px]"
          >
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            className="flex items-start justify-start p-2.5 rounded-[5px] border-1 border-borderGold placeholder:text-placeholder text-white w-full resize-y max-sm:placeholder:text-[11px] max-sm:placeholder:leading-[13px] placeholder:text-[13px] placeholder:leading-[16px]"
            placeholder="Expliquez votre demande ou posez votre question ici..."
          />
          {errors.message && (
            <p className="text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px]">
              {errors.message.message}
            </p>
          )}
        </div>
        {/* Checkbox authorization */}
        <div className="flex flex-col items-start justify-start w-full gap-2.5">
          <label
            htmlFor="authorization"
            className="flex items-center gap-2.5 cursor-pointer text-white"
          >
            <input
              type="checkbox"
              className="sr-only peer"
              id="authorization"
              {...register("authorization")}
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
            <p className=" leading-[16px] text-[13px] max-sm:leading-[13px] max-sm:text-[11px]">
              J'accepte que mes données soient utilisées pour traiter ma
              demande.
            </p>
          </label>
          {errors.authorization && (
            <p className="text-light-red text-[14px] max-sm:text-xs leading-[18px] max-sm:leading-[13px]">
              {errors.authorization.message}
            </p>
          )}
        </div>
        {/* Button send form */}
        <div className="w-fit">
          <Button txt="Envoyer" />
        </div>
      </form>
    </div>
  );
}
