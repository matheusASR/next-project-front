/*
  This example requires some changes to your config:
  
  
// tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
    ],
  }

*/
"use client";

export default function ProductOverview({ product }: any) {
  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product.name}
                </h1>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Image</h2>

              <div className="lg:grid-cols-1 lg:grid-rows-1 lg:gap-8">
                <img
                  // alt={product.image.imageAlt}
                  src={product.coverImage}
                  className="rounded-lg w-full max-w-md mx-auto"
                />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <form className="flex space-x-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to My List
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-black bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  View
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="prose prose-sm mt-4 text-gray-500"
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                {/* <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    {product.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
