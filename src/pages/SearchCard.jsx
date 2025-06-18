import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/shared/button";
import sets from "../data/sets.json";
import CustomMultiSelect from "../components/SearchCard.jsx/CustomMultiSelect";
import CustomTypeSelect from "../components/SearchCard.jsx/CustomTypeSelect";
import artefactTypes from "../data/TypesCards/artefactTypes.json";
import cardTypes from "../data/TypesCards/cardTypes.json";
export default function SearchCard() {
  const schema = yup.object().shape({
    name: yup.string().nullable(),
    extension: yup.array().of(yup.string()).nullable(), //codes comme war, ima, dmu ...
    type: yup.array().of(yup.string()).nullable(),
    text: yup.string().nullable(),
    colors: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(["White", "Blue", "Black", "Red", "Green", "Colorless"])
      )
      .nullable(),
    colorsMatch: yup
      .string()
      .oneOf(["include", "exact", "atMost"])
      .default("include"),
    commanderColors: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(["White", "Blue", "Black", "Red", "Green", "Colorless"])
      )
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
      .of(yup.string().oneOf(["commun", "uncommon", "rare", "mythic"]))
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
    colorsMatch: "include",
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
  const typesData = [
    { name: "Artefact Types", data: artefactTypes.data },
    { name: "Card Types", data: cardTypes.data },
  ];

  return (
    // 279
    <div className='flex flex-col items-center justify-center flex-1 w-full'>
      {/* d filtre rechercher */}
      <form
        onSubmit={handleSubmit(submit)}
        className='w-[1400px] flex flex-col px-16 py-8 rounded-[5px] bg-bg-section border-1 border-borderGold justify-center items-center'
      >
        {/* 293 */}
        <div className='flex items-start justify-center px-2 py-8 w-9/10'>
          {/* 292 */}
          <div className='flex justify-start w-50'>
            <label
              htmlFor='name'
              className='leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold'
            >
              Nom de la carte
            </label>
          </div>
          {/* nom */}
          <div className='flex flex-col items-start justify-start gap-2.5 w-100'>
            {/* input */}
            <input
              {...register("name")}
              type='text'
              id='name'
              className='w-75 h-[35px] p-2.5 text-white rounded-[5px] bg-bg-input border-1 border-borderGold'
            />
            {/* texte */}
            <p className='text-placeholder text-[13px] leading-[16px] '>
              Rechercher les cartes dont le nom contient le mot donné
            </p>
          </div>
        </div>

        {/* 298 */}
        <div className='flex items-start justify-center px-2 py-8 w-9/10'>
          <div className='flex justify-start w-50'>
            <label
              htmlFor='set'
              className='leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold'
            >
              Extension
            </label>
          </div>
          <div className='flex flex-col items-start justify-start gap-2.5  w-100'>
            <Controller
              name='extension'
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
                  placeholder='Sélectionnez des extensions'
                />
              )}
            />
            <p className='text-placeholder text-[13px] leading-[16px]'>
              Sélectionnez une ou plusieurs extensions.
            </p>
          </div>
        </div>

        {/* Sélection des types */}
        <div className='flex items-start justify-center px-2 py-8 w-9/10'>
          <div className='flex justify-start w-50'>
            <label
              htmlFor='type'
              className='leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold'
            >
              Types de carte
            </label>
          </div>
          <div className='flex flex-col items-start justify-start gap-2.5 w-100'>
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <CustomTypeSelect
                  datasets={typesData}
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder='Sélectionnez un ou plusieurs types'
                />
              )}
            />
            <p className='text-placeholder text-[13px] leading-[16px]'>
              Sélectionnez un ou plusieurs types de cartes.
            </p>
          </div>
        </div>
        <Button txt='rechercher' />
      </form>
    </div>
  );
}
