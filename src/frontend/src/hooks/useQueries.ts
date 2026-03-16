import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CatalogueRequest,
  ContentBlock,
  Inquiry,
  Product,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetAllContentBlocks() {
  const { actor, isFetching } = useActor();
  return useQuery<ContentBlock[]>({
    queryKey: ["contentBlocks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContentBlocks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCatalogueRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<CatalogueRequest[]>({
    queryKey: ["catalogueRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCatalogueRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useMarkInquiryRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (index: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.markInquiryRead(index);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}
