import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/shared/Button";
import sets from "../data/sets.json";
import symbols from "../data/symbology.json";
import CustomMultiSelect from "../components/SearchCard.jsx/CustomMultiSelect";
import CustomTypeSelect from "../components/SearchCard.jsx/CustomTypeSelect";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CustomInputSymbology from "../components/SearchCard.jsx/CustomInputSymbology";
import CustomColorsInput from "../components/SearchCard.jsx/CustomColorsInput";
import CustomRarityInput from "../components/SearchCard.jsx/CustomRarityInput";

export default function SearchCard() {
  const [showMore, setShowMore] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().nullable(), //nom de la carte
    extension: yup.array().of(yup.string()).nullable(), // ['war'], ['ima'], ['dmu'] ...
    type: yup.array().of(yup.string()).nullable(), // [Artifact]
    text: yup.string().nullable(), // "{T}" pour tap
    colors: yup // ['W', 'B']
      .array()
      .of(yup.string().oneOf(["W", "U", "B", "R", "G", "C"]))
      .nullable(),
    colorsMatch: yup.string().oneOf(["=", ">=", "<="]).default("="), //>= including, <= atMost, = exactly
    commanderColors: yup // ['W', 'B']
      .array()
      .of(yup.string().oneOf(["W", "U", "B", "R", "G", "C"]))
      .nullable(),
    stats: yup.object({
      cmc: yup
        .object({
          operator: yup.string().oneOf(["=", "<", ">", "<=", ">="]).nullable(),
          value: yup.string().nullable(),
          even: yup.boolean().default(false),
          odd: yup.boolean().default(false),
        })
        .nullable(),
      power: yup
        .object({
          operator: yup.string().oneOf(["=", "<", ">", "<=", ">="]).nullable(),
          value: yup.string().nullable(),
          even: yup.boolean().default(false),
          odd: yup.boolean().default(false),
        })
        .nullable(),
      toughness: yup
        .object({
          operator: yup.string().oneOf(["=", "<", ">", "<=", ">="]).nullable(),
          value: yup.string().nullable(),
          even: yup.boolean().default(false),
          odd: yup.boolean().default(false),
        })
        .nullable(),
    }),
    rarity: yup
      .array()
      .of(yup.string().oneOf(["c", "u", "r", "m"]))
      .nullable(),
    legality: yup
      .object({
        status: yup.string().oneOf(["legal", "restricted", "banned"]),
        format: yup
          .string()
          .oneOf([
            "standard",
            "commander",
            "modern",
            "legacy",
            "pauper",
            "duel",
            "vintage",
          ]),
      })

      .nullable(),
    sort: yup
      .object({
        order: yup
          .string()
          .oneOf([
            "name",
            "set",
            "released",
            "rarity",
            "cmc",
            "power",
            "toughness",
          ])
          .default("name"),
        dir: yup.string().oneOf(["asc", "desc"]).default("asc"),
      })
      .nullable(),
  });
  const defaultValues = {
    name: null,
    extension: null,
    type: null,
    text: null,
    colors: null,
    colorsMatch: "=",
    commanderColors: null,
    stats: {
      cmc: {
        operator: null,
        value: null,
        even: false,
        odd: false,
      },
      power: {
        operator: null,
        value: null,
        even: false,
        odd: false,
      },
      toughness: {
        operator: null,
        value: null,
        even: false,
        odd: false,
      },
    },
    rarity: null,
    legality: null,
    sort: {
      order: "name",
      dir: "asc",
    },
  };
  const {
    register,
    handleSubmit,
    control,
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

  const setOptions = sets.data.map((set) => ({
    label: set.name,
    value: set.code,
    icon: set.icon_svg_uri,
    code: set.code,
  }));

  const symbolOptions = symbols.data.map((symbol) => ({
    symbol: symbol.symbol,
    icon: symbol.svg_uri,
    desc: symbol.english,
  }));

  return (
    // 279
    <div className="flex flex-col items-center justify-center flex-1 w-full py-16 max-lg:py-8">
      {/* d filtre rechercher */}
      <form
        onSubmit={handleSubmit(submit)}
        className="w-4/5 flex flex-col max-lg:px-4 px-16 py-8 rounded-[5px] bg-bg-section border-1 border-borderGold justify-center items-center max-sm:px-2 max-sm:w-9/10 max-sm:items-start"
      >
        {/* Nom container */}
        <div className="flex items-start justify-center px-2 py-8 w-9/10 max-sm:flex-col max-sm:gap-4 max-sm:w-full border-b-1 border-borderGold">
          {/* Nom */}
          <div className="flex justify-start w-50 max-sm:w-full">
            <label
              htmlFor="name"
              className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
            >
              Nom de la carte
            </label>
          </div>
          {/* nom */}
          <div className="flex flex-col items-start justify-start gap-2.5 w-100 max-sm:w-full">
            {/* input */}
            <input
              {...register("name")}
              type="text"
              id="name"
              className="w-100 max-lg:w-75 max-sm:w-full h-[35px] p-2.5 text-white rounded-[5px] bg-bg-input border-1 border-borderGold"
              placeholder='Exemple: "Jace"'
            />
            {/* texte */}
            <p className="text-placeholder text-[13px] leading-[16px] ">
              Rechercher les cartes dont le nom contient le mot donné
            </p>
          </div>
        </div>

        {/* Extension container */}
        <div className="flex items-start justify-center px-2 py-8 w-9/10 max-sm:flex-col max-sm:gap-4 max-sm:w-full border-b-1 border-borderGold">
          <div className="flex justify-start w-50 max-sm:w-full">
            <label
              htmlFor="set"
              className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
            >
              Extension
            </label>
          </div>
          <div className="flex flex-col items-start justify-start gap-2.5  w-100 max-sm:w-full">
            <Controller
              name="extension"
              control={control}
              render={({ field }) => (
                <CustomMultiSelect
                  options={setOptions}
                  value={setOptions.filter((opt) =>
                    field.value?.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    field.onChange(selected.map((option) => option.value))
                  }
                  placeholder="Sélectionnez des extensions"
                />
              )}
            />
            <p className="text-placeholder text-[13px] leading-[16px]">
              Sélectionnez une ou plusieurs extensions.
            </p>
          </div>
        </div>

        {/* Types container */}
        <div className="flex items-start justify-center px-2 py-8 w-9/10 max-sm:flex-col max-sm:gap-4 max-sm:w-full border-b-1 border-borderGold">
          <div className="flex justify-start w-50 max-sm:w-full">
            <label
              htmlFor="type"
              className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
            >
              Types de carte
            </label>
          </div>
          <div className="flex flex-col items-start justify-start gap-2.5 w-100 max-sm:w-full ">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <CustomTypeSelect
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Sélectionnez un ou plusieurs types"
                />
              )}
            />
            <p className="text-placeholder text-[13px] leading-[16px]">
              Sélectionnez un ou plusieurs types de cartes.
            </p>
          </div>
        </div>

        {/* Text container */}
        {showMore && (
          <div className="flex items-start justify-center px-2 py-8 w-9/10 max-sm:flex-col max-sm:gap-4 max-sm:w-full border-b-1 border-borderGold">
            <div className="flex justify-start w-50 max-sm:w-full">
              <label
                htmlFor="text"
                className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
              >
                Texte
              </label>
            </div>
            <div className="flex flex-col items-start justify-start gap-2.5 w-100 max-sm:w-full">
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <CustomInputSymbology
                    options={symbolOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <p className="text-placeholder text-[13px] leading-[16px]">
                Rechercher n'importe quel mot et/ou symbole qui apparait dans le
                texte de la carte.
              </p>
            </div>
          </div>
        )}

        {/* Colors container */}
        {showMore && (
          <div className="flex flex-col items-center gap-4 px-2 py-8 w-9/10 border-b-1 border-borderGold max-sm:w-full">
            <div className="flex justify-center w-full max-sm:flex-col max-sm:gap-4">
              <div className="flex justify-start w-50 max-sm:w-full">
                <label
                  htmlFor="colors"
                  className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
                >
                  Couleurs
                </label>
              </div>
              <div className="flex flex-col items-start justify-start gap-2.5 w-100 max-sm:w-full">
                <Controller
                  name="colors"
                  control={control}
                  render={({ field }) => (
                    <CustomColorsInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Sélectionnez une ou plusieurs couleurs."
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center w-full max-sm:flex-col max-sm:gap-4">
              <div className="flex justify-start w-50 max-sm:w-full">
                <label
                  htmlFor="colorsMatch"
                  className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
                >
                  Filtre couleurs
                </label>
              </div>
              <div className="flex flex-col items-start justify-start gap-2.5 w-100 max-sm:w-full">
                <Controller
                  name="colorsMatch"
                  control={control}
                  render={({ field }) => (
                    <div className="relative flex items-center justify-end w-50">
                      <select
                        {...field}
                        className="w-full h-[-35px] p-2 rounded-[5px] bg-bg-input text-white border-1 border-borderGold appearance-none focus:bg-bg-input"
                      >
                        <option
                          className="bg-bg-input hover:bg-borderGold/20"
                          value={"="}
                        >
                          Exactement
                        </option>
                        <option value={">="}>Inclure</option>
                        <option value={"<="}>Au minimum</option>
                      </select>
                      <ChevronDownIcon className="absolute w-4 h-4 mr-2 pointer-events-none text-gold" />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Commander container */}
        {showMore && (
          <div className="flex flex-col items-center gap-4 px-2 py-8 w-9/10 border-b-1 border-borderGold max-sm:w-full">
            <div className="flex justify-center w-full max-sm:flex-col max-sm:gap-4">
              <div className="flex justify-start w-50 max-sm:w-full">
                <label
                  htmlFor="commanderColors"
                  className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
                >
                  Identité commandant
                </label>
              </div>
              <div className="flex flex-col items-start justify-start gap-2.5 w-100 max-sm:w-full">
                <Controller
                  name="commanderColors"
                  control={control}
                  render={({ field }) => (
                    <CustomColorsInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Rechercher seulement les cartes qui partagent l'identité du commandant"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Statistique container */}

        {/* Rareté container */}
        {showMore && (
          <div className="flex flex-col items-center gap-4 px-2 py-8 w-9/10 border-b-1 border-borderGold max-sm:w-full">
            <div className="flex justify-center w-full max-sm:flex-col max-sm:gap-4">
              <div className="flex justify-start w-50 max-sm:w-full">
                <label
                  htmlFor="rarity"
                  className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold"
                >
                  Rareté carte
                </label>
              </div>
              <div className="flex flex-col items-start justify-start gap-2.5 w-100 max-sm:w-full">
                <Controller
                  name="rarity"
                  control={control}
                  render={({ field }) => (
                    <CustomRarityInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Rechercher des cartes d'une ou plusieurs rareté."
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Format container */}

        {/* Plus d'option */}
        <div className="flex justify-end px-2 py-8 w-9/10 max-sm:w-full border-b-1 border-borderGold ">
          <button
            type="button"
            className="flex items-center gap-2 hover:cursor-pointer text-gold hover:text-gold/70"
            onClick={() => {
              setShowMore(!showMore);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            {showMore ? (
              <>
                <p>Masquer les options</p>
                <ChevronUpIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                <p>Plus d'option</p>
                <ChevronDownIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Trier par */}

        {/* Bouton */}
        <div className="flex items-center justify-center gap-16 pt-8 w-100 max-sm:w-full max-sm:flex-col-reverse max-sm:gap-4 max-sm:px-8">
          <Button txt="Reset" variant="important" onClick={() => reset()} />
          <Button txt="Rechercher" />
        </div>
        <pre className="text-white">{JSON.stringify(errors, null, 2)}</pre>
      </form>
    </div>
  );
}
