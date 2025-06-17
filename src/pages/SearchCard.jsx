import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/shared/button";
export default function SearchCard() {
  const schema = yup.object().shape({
    nomCarte: yup.string().nullable(),
    extension: yup.string().nullable(),
    typeCarte: yup.string().nullable(),
    texteCarte: yup.string().nullable(),
    couleurs: yup
      .array()
      .of(
        yup
          .string()
          .oneOf([
            "White",
            "Blue",
            "Black",
            "Red",
            "Green",
            "Colorless",
            "Multicolore uniquement",
          ])
      ),
    identiteCommandant: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(["White", "Blue", "Black", "Red", "Green", "Colorless"])
      ),
    coutMana: yup.string().nullable(),
    puissance: yup.number().typeError("Doit être un nombre").nullable(),
    endurance: yup.number().typeError("Doit être un nombre").nullable(),
    rareteCarte: yup
      .array()
      .of(
        yup.string().oneOf(["Communes", "Peu communes", "Rares", "Mythiques"])
      ),
    format: yup
      .string()
      .oneOf([
        "Legal",
        "Standard",
        "Pioneer",
        "Modern",
        "Legacy",
        "Vintage",
        "Commander",
      ])
      .nullable(),
    triPar: yup.string().nullable(),
  });
  const defaultValues = {
    nomCarte: "",
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
  }

  return (
    // 279
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      {/* d filtre rechercher */}
      <form
        onSubmit={handleSubmit(submit)}
        className="w-[1400px] flex flex-col px-16 py-8 rounded-[5px] bg-bg-section border-1 border-borderGold justify-center items-center"
      >
        {/* 293 */}
        <div className="flex items-start justify-center px-2 py-8 w-9/10">
          {/* 292 */}
          <div className="flex justify-start w-50 ">
            <label
              htmlFor="nomCarte"
              className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
            >
              Nom de la carte
            </label>
          </div>
          {/* nom */}
          <div className="flex flex-col items-start justify-start gap-2.5 ">
            {/* input */}
            <input
              {...register("nomCarte")}
              type="text"
              id="nomCarte"
              className="w-75 h-[35px] p-2.5 text-white rounded-[5px] bg-bg-input border-1 border-borderGold"
            />
            {/* texte */}
            <p className="text-placeholder text-[13px] leading-[16px] ">
              Rechercher les cartes dont le nom contient le mot donné
            </p>
          </div>
        </div>

        {/* 298 */}
        <div className="flex items-start justify-center px-2 py-8 w-9/10">
          {/* 292 */}
          <div className="flex justify-start w-50 ">
            <label
              htmlFor="extension"
              className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
            >
              Extension
            </label>
          </div>
          {/* nom */}
          <div className="flex flex-col items-start justify-start gap-2.5 ">
            {/* input */}
            <input
              {...register("extension")}
              type="text"
              id="extension"
              className="w-75 h-[35px] p-2.5 text-white rounded-[5px] bg-bg-input border-1 border-borderGold"
            />
            {/* texte */}
            <p className="text-placeholder text-[13px] leading-[16px] ">
              Rechercher des cartes parmis une ou plusieurs extensions
            </p>
          </div>
        </div>
        {/* 295 */}
        <div></div>
        {/* 302 */}
        <div></div>
        {/* 301 */}
        <Button txt="rechercher" />
      </form>
    </div>
  );
}
