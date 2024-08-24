"use client";

import HeaderSection from "@/components/HeaderSection";
import Loading from "@/components/Loading";
import ProductsList from "@/components/ProductsList";
import { api } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CollectionPage() {
  const [user, setUser] = useState<any>({});
  const [collection, setCollection] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const { collectionId } = useParams();

  const router = useRouter();

  const cleanCollectionId =
    typeof collectionId === "string"
      ? collectionId.replace("collection-", "")
      : "";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("load", () => {
      setIsLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("@next-project:TOKEN");
    const getProfile = async () => {
      try {
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          setUser(response.data);
        }
      } catch (error: any) {
        console.error("Failed to fetch user profile", error);
      }
    };

    if (token) {
      getProfile();
    } else {
      sessionStorage.removeItem("@next-project:TOKEN");
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const getCollection = async () => {
      try {
        const response = await api.get(`/collections/${cleanCollectionId}`);
        if (response.statusText === "OK") {
          setCollection(response.data);
          console.log(response.data.products);
        }
      } catch (error: any) {
        console.log(`Erro ao obter coleção: ${error.response.data.message}`);
      }
    };

    if (cleanCollectionId) {
      getCollection();
    }
  }, [cleanCollectionId]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HeaderSection
            title={collection.name}
            description={collection.description}
          />
          <ProductsList
            user={user}
            collectionId={cleanCollectionId}
            products={collection.products}
          />
        </>
      )}
    </>
  );
}
