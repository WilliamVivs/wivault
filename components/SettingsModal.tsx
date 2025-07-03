import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LucidePencil from "@/components/ui/LucidePencil";
import Image from "next/image";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fullName: string;
  avatar: string;
  isLoading: boolean;
  editName: string;
  setEditName: (name: string) => void;
  editNameActive: boolean;
  setEditNameActive: (active: boolean) => void;
  handleSaveName: () => void;
  editAvatar: string;
  setEditAvatar: (avatar: string) => void;
  editAvatarActive: boolean;
  setEditAvatarActive: (active: boolean) => void;
  handleSaveAvatar: () => void;
  closeModals: () => void;
  avatarState: string;
}

const defaultAvatars = [
  'https://picsum.photos/id/40/100/100',
  'https://picsum.photos/id/64/100/100',
  'https://picsum.photos/id/91/100/100',
  'https://picsum.photos/id/152/100/100',
];

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onOpenChange,
  fullName,
  avatar,
  isLoading,
  editName,
  setEditName,
  editNameActive,
  setEditNameActive,
  handleSaveName,
  editAvatar,
  setEditAvatar,
  editAvatarActive,
  setEditAvatarActive,
  handleSaveAvatar,
  closeModals,
  avatarState,
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) closeModals();
    }}>
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          {/* edit name */}
          <div className="settings-wrapper">
            <p className="subtitle-2 pl-1 text-light-100">Name</p>
            <div className="relative">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="settings-input-field pr-8"
                disabled={!editNameActive}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
                onClick={() => setEditNameActive(true)}
                tabIndex={-1}
              >
                <LucidePencil size={16} />
              </button>
            </div>
            {editNameActive && editName !== fullName && (
              <Button
                className="button-modal-settings mt-2"
                onClick={handleSaveName}
                disabled={isLoading}
              >
                Save
              </Button>
            )}
          </div>
          {/* Editar avatar (selector de archivo, drag&drop y opciones por defecto) */}
          <div className="settings-wrapper">
            <p className="subtitle-2 pl-1 text-light-100">Avatar</p>
            <div className="flex flex-col gap-2">
              {/* Selector de archivo */}
              <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setEditAvatar(ev.target?.result as string);
                    setEditAvatarActive(true);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <div className="flex gap-5 mt-4 justify-center">
                {defaultAvatars.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    className={`rounded-full border-2 ${editAvatar === img ? 'border-brand' : 'border-gray-300'} p-1 bg-white hover:border-brand transition`}
                    onClick={() => { setEditAvatar(img); setEditAvatarActive(true); }}
                  >
                    <Image src={img} alt={`Avatar opción ${idx+1}`} width={60} height={60} className="rounded-full object-cover" />
                  </button>
                ))}
              </div>
              <div
                className="w-full h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setEditAvatar(ev.target?.result as string);
                    setEditAvatarActive(true);
                  };
                  reader.readAsDataURL(file);
                }}
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <span className="text-xs text-gray-400">Upload or drag an image</span>
              </div>
              {/* Vista previa */}
              <div className="flex items-center gap-3 mt-2">
                <Image src={editAvatar} alt="Avatar preview" width={44} height={44} className="rounded-full border object-cover" />
                {editAvatarActive && editAvatar !== avatarState && (
                  <Button
                    className="button-modal-settings"
                    onClick={handleSaveAvatar}
                    disabled={isLoading}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
