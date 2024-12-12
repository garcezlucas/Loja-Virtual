"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IconButton from "./IconButton";
import Modal from "@/components/Modal";
import StoreIcon from "../../../public/icons/store-shop.svg";
import CartIcon from "../../../public/icons/cart.svg";
import UserIcon from "../../../public/icons/user.svg";
import Dropdown from "./Dropdown";
import Login from "../login/Login";

const Header: React.FC = () => {
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<
    number | null
  >(null);
  const [openLogin, setOpenLogin] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("cookies") : null;

  const HEADER_CONFIG = [
    {
      icon: UserIcon,
      alt: "User",
      dropdownItems: [
        accessToken
          ? {
              label: "Logout",
              onClick: () => {
                localStorage.removeItem("cookies");
                setVisibleDropdownIndex(null);
              },
            }
          : {
              label: "Login",
              onClick: () => setOpenLogin(true),
            },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisibleDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (index: number) => {
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  return (
    <>
      <header className="bg-[#FAFAFA] text-gray-100 py-4 shadow-md">
        <div className="w-full flex items-center justify-between px-4">
          <Link href={"/"}>
            <div className="flex items-center space-x-2">
              <Image src={StoreIcon} alt="Store Logo" width={32} height={32} />
              <span className="text-black font-semibold">Loja Virtual</span>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href={"/cart"}>
              <IconButton src={CartIcon} alt="Carrinho de Compras" />
            </Link>
            {HEADER_CONFIG.map((item, index) => (
              <div key={index} className="relative" ref={dropdownRef}>
                <IconButton
                  src={item.icon}
                  alt={item.alt}
                  onClick={() => toggleDropdown(index)}
                />
                {visibleDropdownIndex === index && (
                  <Dropdown items={item.dropdownItems} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
        <Login setOpenLogin={setOpenLogin} />
      </Modal>
    </>
  );
};

export default Header;
