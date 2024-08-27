"use client";

import EmptyState from "../EmptyState";

export default function ProductsListAdmin({ collectionId, products }: any) {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: any) => {
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
