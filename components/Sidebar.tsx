"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OtpModal from "@/components/OTPModal";
import {
  updateUserName,
  updateUserAvatar,
  deleteUserAccount,
  getCurrentUser,
  sendEmailOTP,
} from "@/lib/actions/user.actions";
import LucidePencil from "@/components/ui/LucidePencil";
import SettingsModal from "@/components/SettingsModal";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName: initialFullName, avatar, email: initialEmail }: Props) => {
  const pathname = usePathname();
  const [settingsModal, setsettingsModal] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [editName, setEditName] = useState(initialFullName);
  const [fullName, setFullName] = useState(initialFullName);
  const [editEmail, setEditEmail] = useState(initialEmail);
  const [email, setEmail] = useState(initialEmail);
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [avatarState, setAvatarState] = useState(avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState("");
  const [editNameActive, setEditNameActive] = useState(false);
  const [editEmailActive, setEditEmailActive] = useState(false);
  const [editAvatarActive, setEditAvatarActive] = useState(false);

  useEffect(() => {
    const fetchAccountId = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.accountId) {
          setAccountId(user.accountId);
        }
      } catch (e) {
        setAccountId(null);
      }
    };
    fetchAccountId();
  }, []);

  const closeModals = () => {
    setsettingsModal(false);
    setShowOtp(false);
    setEmailWarning("");
    setEditAvatar(avatarState);
    setEditNameActive(false);
  };

  const handleSaveName = async () => {
    setIsLoading(true);
    try {
      if (!accountId) return;
      await updateUserName({ accountId, editFullName: editName });
      setFullName(editName); // Actualiza el nombre en el sidebar
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAvatar = async () => {
    setIsLoading(true);
    try {
      if (!accountId) return;
      await updateUserAvatar({ accountId, editAvatar: editAvatar });
      setEditAvatarActive(false);
      setAvatarState(editAvatar); // Actualiza el avatar mostrado en el sidebar
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.png"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block ml-1"
        />

        <Image
          src="/assets/icons/logo-brand.png"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full ">
              <li
                className={cn(
                  "sidebar-nav-item hover:scale-105 transition-all duration-300",
                  pathname === url && "shad-active"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active"
                  )}
                />
                <p className="hidden lg:block ">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/files.png"
        alt="logo"
        width={580}
        height={418}
        className="w-full mb-5"
      />

      <div className="sidebar-user-info flex items-center justify-between w-full gap-2 px-2">
        <div className="flex items-center gap-3">
          <Image
            src={avatarState}
            alt="Avatar"
            width={55}
            height={55}
            className="sidebar-user-avatar"
          />
          <div className="hidden lg:block">
            <p className="subtitle-2 capitalize">{fullName}</p>
            <p className="caption">
              {email.length > 15 ? `...${email.slice(-17)}` : email}
            </p>
          </div>
        </div>
        <Image
          src="/assets/icons/settings.svg"
          alt="settings"
          width={35}
          height={35}
          className="hover:scale-105 transition-all hover:rotate-180 duration-300 cursor-pointer ml-5"
          onClick={() => setsettingsModal(true)}
        />
      </div>
      {/* Modal de Settings */}
      <SettingsModal
        open={settingsModal}
        onOpenChange={setsettingsModal}
        fullName={fullName}
        avatar={avatarState}
        isLoading={isLoading}
        editName={editName}
        setEditName={setEditName}
        editNameActive={editNameActive}
        setEditNameActive={setEditNameActive}
        handleSaveName={handleSaveName}
        editAvatar={editAvatar}
        setEditAvatar={setEditAvatar}
        editAvatarActive={editAvatarActive}
        setEditAvatarActive={setEditAvatarActive}
        handleSaveAvatar={handleSaveAvatar}
        closeModals={closeModals}
        avatarState={avatarState}
      />
      {/* Modal OTP para cambio de correo */}
      {showOtp && accountId && (
        <OtpModal
          email={editEmail}
          accountId={accountId}
          redirectOnSuccess={false}
          onClose={() => setShowOtp(false)}
        />
      )}
    </aside>
  );
};
export default Sidebar;
