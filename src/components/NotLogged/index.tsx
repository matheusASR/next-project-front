"use client";
import { useRouter } from "next/navigation";

export default function NotLogged() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="text-center mt-20">
      {" "}
      {/* Adiciona margem superior */}
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-auto h-12 w-12 text-gray-400"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Not Logged</h3>
      <p className="mt-1 text-sm text-gray-500">
        Log in to see your products list.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleLoginClick}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
