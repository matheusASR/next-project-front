"use client";

import { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import { toast } from "sonner";
import { api } from "@/services/api";

export default function ProductsMyList({ user, setUser }: any) {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    setProducts(user.products);
    console.log(user.products)
  }, [user.products]);

  const removeFromList = async (productId: number) => {
    // setLoading(true);
    try {
      const response = await api.delete(`/userProducts/${user.id}/${productId}`);
      if (response.statusText === "OK") {
        toast.success("Produto removido de sua lista!");
        console.log(response.data)
        setUser(response.data)
      }
    } catch (error: any) {
      toast.error(`Erro ao remover produto: ${error.response.data.message}`);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {products && products.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product: any) => (
              <div key={product.id}>
                <a
                  href={`/dashboard/collection-${product.collection.id}/product-${product.id}`}
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
                <button
                  type="button"
                  onClick={() => removeFromList(product.id)}
                  className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
