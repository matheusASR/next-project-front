"use client";

import { useEffect, useState } from "react";
import EmptyState from "../EmptyState";

export default function ProductsMyList({ user }: any) {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    setProducts(user.myList);
  }, [user.myList]);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {products && products.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product: any) => (
              <div key={product.id} className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    // alt={product.imageAlt}
                    src={product.coverImage}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
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
