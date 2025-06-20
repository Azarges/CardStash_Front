import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/shared/Button";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
//import card from "../../assets/card.jpeg";
import ProfileSelector from "../../components/Profile/ProfileSelector";
import HorizontalScrollWrapper from "../../components/shared/HorizontalScrollWrapper";
/* <NavLink to="data" className="text-white">
        Data
      </NavLink>
      <Outlet /> */

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      {/* body */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-16 px-4 py-10">
        {/* username + btn */}
        <div className="flex flex-col w-full gap-6 sm:flex-row">
          {/* 129 */}
          <div className="flex justify-start items-center gap-8 h-[108px] w-full flex-1">
            {/* avatar */}
            <img
              src={defaultAvatar}
              alt="avatarUser"
              className="w-24 h-24 rounded-full border-1 border-borderGold"
            />
            {/* 145 */}
            <div className="flex flex-col gap-2.5 items-start">
              {/* utilisateur */}
              <p className="text-white text-[28px] leading-[37px] max-sm:leading-[23px] max-sm:text-[18px] font-title">
                {user.username}
              </p>
              {/* membre depuis ... */}
              <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-white">
                Membre depuis le {user.createdAt}
              </p>
            </div>
          </div>
          {/* 148 */}
          <div className="flex flex-col sm:items-end items-start gap-2.5 h-auto sm:h-[108px] p-2.5">
            <NavLink to="/settings">
              <Button txt="Modifier le profil" />
            </NavLink>
            <NavLink to="/inventory">
              <Button txt="Accéder à l'inventaire" />
            </NavLink>
          </div>
        </div>
        {/* section statistique */}
        <div className="grid w-full grid-cols-2 sm:grid-cols-4">
          {/* 132 */}
          <div className="flex flex-col items-center justify-between w-full h-full p-5 border-1 border-borderGold min-h-25">
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-white text-center">
              Cartes en possession
            </p>
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold text-center">
              342
            </p>
          </div>
          {/* 133 */}
          <div className="flex flex-col items-stretch justify-between w-full p-5 border-1 border-borderGold min-h-25">
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-white text-center">
              Decks crées
            </p>
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold text-center">
              12
            </p>
          </div>
          {/* 134 */}
          <div className="flex flex-col items-center justify-between w-full h-full p-5 border-1 border-borderGold min-h-25">
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-white text-center">
              Échanges / Prêts effectués
            </p>
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold text-center">
              29
            </p>
          </div>
          {/* 135 */}
          <div className="flex flex-col items-stretch justify-between w-full p-5 border-1 border-borderGold min-h-25">
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-white text-center">
              Cartes favorites
            </p>
            <p className="leading-[19px] max-sm:leading-[17px] max-sm:text-[14px] text-gold text-center">
              8
            </p>
          </div>
        </div>
        {/* cartes list favorites */}
        <HorizontalScrollWrapper className="w-full px-4 overflow-x-auto scrollbar-hide scroll-smooth">
          {/* Cartes */}
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
          <div className="inline-block w-[200px] rounded-[5px] border-borderGold border-1 shadow-lg mr-4 max-sm:w-[140px] scroll-snap-align-start">
            <img
              src="https://cards.scryfall.io/png/front/b/c/bc2bd8b8-2598-450f-a422-1b89797013f1.png?1673301341"
              alt="Carte"
              className="object-cover"
            />
          </div>
        </HorizontalScrollWrapper>
        <ProfileSelector />
      </div>
    </div>
  );
}
