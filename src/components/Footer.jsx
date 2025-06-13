import logo from "../assets/logo.png";
export default function Footer() {
  return (
    <footer className="flex-col flex gap-4 py-4 bg-nav border-t-[1px] border-borderGold ">
      {/* 203 */}
      <div className="flex justify-between px-16 max-lg:flex-col max-lg:justify-center max-lg:items-center max-sm:px-4">
        {/* Logo + text */}
        <div className="flex-col flex gap-2.5 justify-start items-start max-lg:justify-center max-lg:items-center">
          {/* logo */}
          <div className="flex gap-2.5 justify-center items-center text-gold">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <p className="font-title leading-[37px] text-[28px]">CardStash</p>
          </div>
          <p className="text-white text-[13px]">
            Gérez, partagez et construisez vos cartes MTG en toute simplicité
          </p>
        </div>
        {/* Liens utiles 201*/}
        <div className="flex flex-col justify-center items-center gap-2.5 ">
          <p className="text-gold leading-[19px]">Liens utiles</p>
          <div className="flex items-start justify-start gap-8 text-white text-[13px] leading-4 max-sm:flex-col max-sm:gap-1">
            <p>Mentions légales</p>
            <p>Politique de confidentialité</p>
            <p>Conditions d'utilisation</p>
          </div>
        </div>
        {/* Contact  202*/}
        <div className="flex flex-col gap-2.5 items-center justify-center">
          <p className="text-gold leading-[19px]">Contact</p>
          <p className="text-white text-[13px] leading-4 ">
            contact@cardstash.fr
          </p>
        </div>
      </div>
      <p className="text-white text-[13px] leading-4 w-full text-center">
        ©2025 CardStash. Tous droits réservés
      </p>
    </footer>
  );
}
