"use client";

import AlertModal from "../AlertModal";
import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductsAdmin({ products, setProducts }: any) {
  const [showModal, setShowModal] = useState(false);
  const [productSelectedId, setProductSelectedId] = useState<string>("");
  const [textareaValue, setTextareaValue] = useState<string>("");

  const handleCreateProduct = async () => {
    try {
      const data = JSON.parse(textareaValue);
      data.forEach(async (d: any) => {
        const response = await api.post("/products", d);
        if (response.statusText === "Created") {
          setProducts([...products, response.data]);
        }
      });
      toast.success("Produto(s) criado(s) com sucesso!");
    } catch (error: any) {
      toast.error(
        `Erro ao criar produto(s): ${
          error.response?.data?.message || "Erro desconhecido"
        }`
      );
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await api.delete(`/products/${productSelectedId}`);
      if (response.status === 204) {
        toast.success("Produto deletado com sucesso!");
        setProducts(
          products.filter((product: any) => product.id !== productSelectedId)
        );
        setShowModal(false);
      }
    } catch (error: any) {
      toast.error(
        `Erro ao deletar produto: ${
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
              Create
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Esta ação criará um produto para cada objeto que esta contido na
              lista a lado.
            </p>
          </div>

          <textarea
            id="products"
            rows={3}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            className="mt-2 mb-5 block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 h-32"
          ></textarea>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleCreateProduct}
              className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 border border-black w-auto"
            >
              Create
            </button>
          </div>
        </div>

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
            id="productsName"
            value={productSelectedId}
            onChange={(e) => setProductSelectedId(e.target.value)}
            className="mt-2 mb-5 block w-full rounded-md border-0 py-2 px-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 h-12"
          >
            <option value="" disabled>
              Selecione um produto
            </option>
            {products.map((product: any) => (
              <option key={product.id} value={product.id}>
                {product.name}
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
        onConfirm={handleDeleteProduct}
        title="Você tem certeza absoluta?"
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente o produto e removerá seus dados de nossos servidores."
        confirmText="Sim, deletar este produto"
      />
    </>
  );
}
