"use client";

import AlertModal from "../AlertModal";
import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";

export default function UsersAdmin({ users, setUsers }: any) {
  const [showModal, setShowModal] = useState(false);
  const [userSelectedId, setUserSelectedId] = useState<string>("");

  const handleDeleteUser = async () => {
    try {
      const response = await api.delete(`/users/${userSelectedId}`);
      if (response.status === 204) {
        toast.success("Usuário deletado com sucesso!");
        setUsers(users.filter((user: any) => user.id !== userSelectedId));
        setShowModal(false);
      }
    } catch (error: any) {
      toast.error(
        `Erro ao deletar usuário: ${
          error.response?.data?.message || "Erro desconhecido"
        }`
      );
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-black">
              Delete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Esta ação não é reversível. Todos esses dados serão removidos
              permanentemente.
            </p>
          </div>

          <select
            id="usersName"
            value={userSelectedId}
            onChange={(e) => setUserSelectedId(e.target.value)}
            className="mt-2 mb-5 block w-full rounded-md border-0 py-2 px-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
          >
            <option value="" disabled>
              Selecione um usuário
            </option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 border border-black w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <AlertModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteUser}
        title="Você tem certeza absoluta?"
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente o usuário e removerá seus dados de nossos servidores."
        confirmText="Sim, deletar este usuário"
      />
    </>
  );
}
