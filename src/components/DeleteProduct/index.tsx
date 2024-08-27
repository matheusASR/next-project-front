"use client";

import AlertModal from "@/components/AlertModal";
import { api } from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteProduct({ products, setProducts }: any) {
  const [showModal, setShowModal] = useState(false);
  const [productSelectedId, setProductSelectedId] = useState<string>("");

  const handleModalDeleteProduct = () => {
    setShowModal(true);
  };

  const handleDeleteProduct = async () => {
    // setLoading(true);
    try {
      const response = await api.delete(`/products/${productSelectedId}`);
      if (response.status === 204) {
        toast.success("Produto deletado com sucesso!");
        setProducts(
          products.filter((product: any) => product.id !== productSelectedId)
        );
      }
    } catch (error: any) {
      toast.error(`Erro ao deletar produto: ${error.response.data.message}`);
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Delete product
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This action is not reversible. All this data will be permanently
            removed.
          </p>
        </div>

        <select
          id="productName"
          value={productSelectedId}
          onChange={(e) => setProductSelectedId(e.target.value)}
          className="mt-2 mb-5 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={handleModalDeleteProduct}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete product
          </button>
        </div>
      </div>
      <AlertModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteProduct}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete the product and remove its data from our servers."
        confirmText="Yes, delete this product"
      />
    </>
  );
}
