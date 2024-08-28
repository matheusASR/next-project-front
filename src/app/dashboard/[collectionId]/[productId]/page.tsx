"use client";

import Loading from "@/components/Loading";
import ProductView from "@/components/ProductView";
import { api } from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductsCollectionPage() {
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  const cleanProductId =
    typeof productId === "string" ? productId.replace("product-", "") : "";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${cleanProductId}`);
        if (response.statusText === "OK") {
          setProduct(response.data);
        }
      } catch (error: any) {
        toast.error(`Erro ao obter produto: ${error.response.data.message}`);
      }
    };

    if (cleanProductId) {
      getProduct();
    }
  }, [cleanProductId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("load", () => {
      setIsLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ProductView product={product} />
        </>
      )}
    </>
  );
}
