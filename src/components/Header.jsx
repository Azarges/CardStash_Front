import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  Transition,
} from "@headlessui/react";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/defaultAvatar.jpg";
import Button from "./shared/button";
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // État pour ouvrir le panneau
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloque le scroll
    } else {
      document.body.style.overflow = ""; // Réinitialise (auto ou visible selon le navigateur)
    }

    // Nettoyage si le composant se démonte
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`h-[64px] px-5 max-lg:px-4 bg-nav shadow-2xs text-gold flex flex-row items-center border-b-[1px] border-gold max-lg:justify-between w-full gap-20 max-lg:gap-0`}
    >
      {/* Logo */}
      <div className="flex flex-shrink-0">
        <NavLink to="/" className="font-title text-[28px] flex items-center">
          <img src={logo} alt="Logo" className="object-contain w-12 h-12" />
          <p className="ml-2 max-sm:hidden ">CardStash</p>
        </NavLink>
      </div>

      {/* Menu desktop */}
      <div className="flex items-center w-full gap-4 grow max-lg:hidden">
        <Menu as="div" className="relative inline-block text-center ">
          <div>
            <MenuButton className="inline-flex items-center w-full h-10 px-4 font-semibold focus:outline-none">
              Recherche
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 transition origin-top rounded-md shadow-lg bg-nav focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="flex-col ">
              <MenuItem>
                <a
                  href="#"
                  className="flex px-4 py-2 text-sm text-gold data-focus:bg-bg-section data-focus:outline-hidden text-[13px] font-semibold justify-center items-center"
                >
                  Recherche carte
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="flex px-4 py-2 text-sm text-gold data-focus:bg-bg-section data-focus:rounded-b-md data-focus:outline-hidden whitespace-nowrap text-[13px] font-semibold justify-center items-center"
                >
                  Recherche utilisateur
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
        <Menu as="div" className="relative inline-block text-left ">
          <div>
            <MenuButton className="inline-flex items-center w-full h-10 px-4 font-semibold focus:outline-none">
              Cartes
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 transition origin-top rounded-md shadow-lg bg-nav focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="flex-col ">
              <MenuItem>
                <a
                  href="#"
                  className="flex px-4 py-2 text-sm text-gold data-focus:bg-bg-section data-focus:outline-hidden text-[13px] font-semibold justify-center items-center"
                >
                  Inventaire
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="flex px-4 py-2 text-sm text-gold data-focus:bg-bg-section data-focus:rounded-b-md data-focus:outline-hidden whitespace-nowrap text-[13px] font-semibold justify-center items-center"
                >
                  Mes souhaits
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        <div className="flex items-center h-10 px-4 ">
          <p className="font-semibold ">Échanger</p>
        </div>
        <div className="flex items-center justify-center h-10 px-4 ">
          <p className="font-semibold">Decks</p>
        </div>
      </div>
      {/* Affichage profil version mobile */}
      <div className="flex items-center justify-center w-full gap-4 grow min-lg:hidden">
        <Menu as="div" className="relative inline-block text-left ">
          <div>
            <MenuButton className="inline-flex items-center w-full h-10 px-4 font-semibold focus:outline-none">
              <FaUser className="w-8 h-8" />

              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 transition origin-top rounded-md shadow-lg bg-nav focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="flex-col ">
              <MenuItem>
                <a
                  href="/profile"
                  className="flex px-4 py-2 text-sm text-gold data-focus:bg-bg-section data-focus:outline-hidden text-[13px] font-semibold justify-center items-center"
                >
                  Mon Profil
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="flex px-4 py-2 text-sm text-gold data-focus:bg-bg-section data-focus:rounded-b-md data-focus:outline-hidden whitespace-nowrap text-[13px] font-semibold justify-center items-center"
                >
                  Paramètres
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      {/* Bouton burger visible sur mobile */}
      <div className="flex items-center justify-center lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer text-gold"
        >
          <IoMenu className="w-8 h-8 " />
        </button>
      </div>
      {/* Bouton Connexion, Inscription / Profil desktop */}
      <div className="hidden lg:flex items:center">
        <ul>
          {user ? (
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-center ">
                <MenuButton>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold whitespace-nowrap">
                      Utilisateur 1
                    </p>
                    <div className="w-8 h-8 overflow-hidden rounded-full shrink-0">
                      <img
                        src={defaultAvatar}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 transition origin-top rounded-md shadow-lg bg-nav focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <a
                      className="block px-4 py-2 text-sm font-semibold data-focus:bg-bg-section text-gold"
                      href="/settings"
                    >
                      Mon profil
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block px-4 py-2 text-sm font-semibold data-focus:bg-bg-section text-gold"
                      href="/support"
                    >
                      Paramètres
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="/"
                      onClick={logout}
                      className="block px-4 py-2 text-sm font-semibold data-focus:bg-bg-section text-gold"
                    >
                      Déconnexion
                    </NavLink>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <div className="flex gap-2.5">
              <NavLink to="login">
                <Button txt="Connexion" />
              </NavLink>
              <NavLink to="register">
                <Button txt="Inscription" />
              </NavLink>
            </div>
          )}
        </ul>
      </div>
      {/* Menu latéral (Drawer) toujours monté, animé via classes */}
      <div
        className="fixed inset-0 z-50 flex pointer-events-none"
        aria-hidden={!isOpen}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/70 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="sidebarTitle"
          className={`ml-auto relative h-[568px] w-[320px] bg-nav text-gold shadow-lg p-5 z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col h-full">
            {/* Close Button */}
            <button
              className="flex justify-end mb-5 cursor-pointer text-gold"
              onClick={() => setIsOpen(false)}
            >
              <IoClose className="w-8 h-8" />
            </button>

            {/* Links */}
            <div className="flex-col flex gap-2.5">
              <NavLink to="#" onClick={() => setIsOpen(false)}>
                <Button txt="Inventaire" />
              </NavLink>
              <NavLink to="#" onClick={() => setIsOpen(false)}>
                <Button txt="Recherche carte" />
              </NavLink>
              <NavLink to="#" onClick={() => setIsOpen(false)}>
                <Button txt="Recherche utilisateur" />
              </NavLink>
              <NavLink to="#" onClick={() => setIsOpen(false)}>
                <Button txt="Échanger" />
              </NavLink>
              <NavLink to="#" onClick={() => setIsOpen(false)}>
                <Button txt="Mes souhaits" />
              </NavLink>
              <NavLink to="#" onClick={() => setIsOpen(false)}>
                <Button txt="Decks" />
              </NavLink>
            </div>

            <div className="mt-auto">
              {user ? (
                <Button txt="Déconnexion" onClick={logout} variant="a" />
              ) : (
                <div className="flex flex-col gap-2.5">
                  <NavLink to="login" onClick={() => setIsOpen(false)}>
                    <Button txt="Connexion" />
                  </NavLink>
                  <NavLink to="register" onClick={() => setIsOpen(false)}>
                    <Button txt="Inscription" />
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
