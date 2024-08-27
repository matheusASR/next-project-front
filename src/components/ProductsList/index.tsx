"use client";

import { toast } from "sonner";
import EmptyState from "../EmptyState";
import { api } from "@/services/api";

export default function ProductsList({ user, setUser, collectionId, products }: any) {
  const addToList = async (productId: number) => {
    console.log(productId)
    // setLoading(true);
    try {
      const response = await api.post(`/userProducts/${user.id}/${productId}`);
      if (response.statusText === "OK") {
        toast.success("Produto adicionado à sua lista!");
        console.log(response.data)
        setUser(response.data)
      }
    } catch (error: any) {
      toast.error(`Erro ao adicionar produto: ${error.response.data.message}`);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: any) => {
              const isProductInUserList = user.products?.some(
                (userProduct: any) => userProduct.id === product.id
              );

              return (
                <div key={product.id}>
                  <a
                    href={`/dashboard/collection-${collectionId}/product-${product.id}`}
                    className="group"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        // alt={product.imageAlt}
                        src={product.coverImage}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 mb-3 text-base text-gray-800">
                      {product.name}
                    </h3>
                  </a>
                  {isProductInUserList ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      
                      Added
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToList(product.id)}
                      className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                      Add My List
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
