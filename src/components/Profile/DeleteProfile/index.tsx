"use client";

import AlertModal from "@/components/AlertModal";
import { useState } from "react";

export default function DeleteProfile({ user }: any) {
  const [showModal, setShowModal] = useState(false);

  const handleModalDeleteAccount = () => {
    setShowModal(true);
  };

  const handleDeleteAccount = () => {
    console.log("Account delected");
  };

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Delete account
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All your data will be permanently
            removed.
          </p>
        </div>

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={handleModalDeleteAccount}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete account
          </button>
        </div>
      </div>
      <AlertModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteAccount}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        confirmText="Yes, delete my account"
      />
    </>
  );
}
