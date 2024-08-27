"use client";

import AlertModal from "@/components/AlertModal";
import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteCollection({ collections, setCollections }: any) {
  const [showModal, setShowModal] = useState(false);
  const [collectionSelectedId, setCollectionSelectedId] = useState<string>("");

  const handleModalDeleteCollection = () => {
    setShowModal(true);
  };

  const handleDeleteCollection = async () => {
    // setLoading(true);
    try {
      const response = await api.delete(`/collections/${collectionSelectedId}`);
      if (response.status === 204) {
        toast.success("Coleção deletada com sucesso!");
        setCollections(
          collections.filter(
            (collection: any) => collection.id !== collectionSelectedId
          )
        );
        setShowModal(false);
      }
    } catch (error: any) {
      toast.error(`Erro ao deletar coleção: ${error.response.data.message}`);
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Delete collection
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Esta ação não é reversível. Todos esses dados serão removidos
            permanentemente.
          </p>
        </div>

        <select
          id="collectionName"
          value={collectionSelectedId}
          onChange={(e) => setCollectionSelectedId(e.target.value)}
          className="mt-2 mb-5 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="" disabled>
            Selecione uma coleção
          </option>
          {collections.map((collection: any) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={handleModalDeleteCollection}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete collection
          </button>
        </div>
      </div>
      <AlertModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteCollection}
        title="Você tem certeza absoluta?"
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a coleção e removerá seus dados de nossos servidores."
        confirmText="Sim, deletar esta coleção"
      />
    </>
  );
}
