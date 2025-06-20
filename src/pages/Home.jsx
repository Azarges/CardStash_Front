import Button from "../components/shared/Button";
import CardDecks from "../assets/CardDecks.png";
import CardInventory from "../assets/CardInventory.png";
import CardTrade from "../assets/CardTrade.png";
import { NavLink } from "react-router-dom";
import Contact from "./forms/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Landing page */}
      <div
        className="flex flex-col w-full bg-cover bg-center justify-center items-center min-h-[calc(100vh-64px)] max-sm:min-h-[calc(100vh-56px)] max-lg:items-start max-lg:pl-8 max-sm:pl-2 border-b-1 border-borderGold shadow-md"
        style={{ backgroundImage: "url('/accueil.png')" }}
      >
        <div className="flex flex-col w-5xl gap-8 p-2.5 justify-start items-start max-lg:w-auto">
          <p className="text-gold font-title text-5xl leading-[63px] tracking-[0.02em] font-bold max-sm:text-3xl max-sm:leading-[39px]">
            Votre collection
          </p>
          <p className="text-gold font-title text-5xl leading-[63px] tracking-[0.02em] font-bold max-sm:text-3xl max-sm:leading-[39px]">
            vos échanges
          </p>
          <p className="text-gold font-title text-5xl leading-[63px] tracking-[0.02em] font-bold max-sm:text-3xl max-sm:leading-[39px]">
            vos decks
          </p>
          <p className="text-white font-title font-semibold tracking-[0.02em] text-4xl leading-[46px] max-sm:text-xl max-sm:leading-[26px]">
            Numérisez votre classeur MTG
          </p>

          <Button txt="Accéder à mon inventaire" variant="landing" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-16 py-16 max-md:px-4">
        {/* Cards overflow */}
        <div className="flex items-center justify-center w-full gap-16 py-16 overflow-x-auto max-lg:justify-start scroll-smooth overflow max-sm:px-4 max-lg:px-12">
          {/* Card 1 Inventory */}
          <div className="flex flex-col  gap-2.5 p-2 bg-bg-section border-3 border-borderGold shadow-md rounded-[13px] max-sm:w-52 max-sm:h-65 max-xl:w-3xs max-xl:h-81 w-76 h-96 shrink-0">
            <NavLink to="/" className="w-full h-full">
              <div className="relative rounded-[7px] border-borderGold border-1 p-6 flex flex-col justify-start gap-16 items-center group w-full h-full max-sm:gap-4">
                <img
                  src={CardInventory}
                  alt="InventoryCard"
                  className="absolute top-0 left-0 rounded-[40px] border-borderGold border-1 object-cover z-0 transition duration-300 group-hover:brightness-50 max-sm:brightness-50"
                />
                <p className="relative z-10 text-[28px] font-title text-gold leading-[37px]">
                  Inventaire
                </p>
                <p
                  className="relative z-10 text-white leading-[19px] transition-opacity duration-500 
                  sm:opacity-0 sm:invisible sm:group-hover:opacity-100 sm:group-hover:visible 
                  max-sm:block"
                >
                  Gérez facilement votre collection de cartes : visualisez,
                  organisez et accédez rapidement à toutes vos cartes.
                </p>
              </div>
            </NavLink>
          </div>
          {/* Card 2 Trade */}
          <div className="flex flex-col  gap-2.5 p-2 bg-bg-section border-3 border-borderGold shadow-md rounded-[13px] max-sm:w-52 max-sm:h-65 max-xl:w-3xs max-xl:h-81 w-76 h-96 shrink-0">
            <NavLink to="/" className="w-full h-full">
              <div className="relative rounded-[7px] border-borderGold border-1 p-6 flex flex-col justify-start gap-16 items-center group w-full h-full max-sm:gap-4">
                <img
                  src={CardTrade}
                  alt="TradeCard"
                  className="absolute top-0 left-0 rounded-[40px] border-borderGold border-1 object-cover z-0 transition duration-300 group-hover:brightness-50 max-sm:brightness-50"
                />
                <p className="relative z-10 text-[28px] font-title text-gold leading-[37px]">
                  Échanges
                </p>

                <p
                  className="relative z-10 text-white leading-[19px] transition-opacity duration-500 
                  sm:opacity-0 sm:invisible sm:group-hover:opacity-100 sm:group-hover:visible 
                  max-sm:block"
                >
                  Échangez ou prêtez vos cartes rapidement avec d’autres
                  utilisateurs.
                </p>
              </div>
            </NavLink>
          </div>
          {/* Card 3 decks */}
          <div className="flex flex-col gap-2.5 p-2 bg-bg-section border-3 border-borderGold shadow-md rounded-[13px] max-sm:w-52 max-sm:h-65 max-xl:w-3xs max-xl:h-81 w-76 h-96 shrink-0 ">
            <NavLink to="/" className="w-full h-full">
              <div className="relative rounded-[7px] border-borderGold border-1 p-6 flex flex-col justify-start gap-16 items-center group w-full h-full max-sm:gap-4">
                <img
                  src={CardDecks}
                  alt="DecksCard"
                  className="absolute top-0 left-0 rounded-[40px] border-borderGold border-1 object-cover z-0 transition duration-300 group-hover:brightness-50 max-sm:brightness-50"
                />
                <p className="relative z-10 text-[28px] font-title text-gold leading-[37px]">
                  Decks
                </p>
                <p
                  className="relative z-10 text-white leading-[19px] transition-opacity duration-500 
                  sm:opacity-0 sm:invisible sm:group-hover:opacity-100 sm:group-hover:visible 
                  max-sm:block"
                >
                  Créez et personnalisez vos decks en quelques clics. Planifiez
                  vos stratégies et testez vos compositions avant chaque duel.
                </p>
              </div>
            </NavLink>
          </div>
        </div>
        {/* Contact */}
        <Contact />
      </div>
    </div>
  );
}
