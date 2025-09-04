import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bannerService } from "@/services/banner.service";

// ✅ Create Banner
export const useCreateBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bannerService.createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banners-device"] });
    },
  });
};

// ✅ Delete Banner
export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bannerService.deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banners-device"] });
    },
  });
};

// ✅ Update Banner
export const useUpdateBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { id: string | number; data: any }) =>
      bannerService.updateBanner(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners-device"] });
    },
  });
};

// ✅ Reorder Banner
export const useReorderBannerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { id: string | number; data: any }) =>
      bannerService.reorderBanner(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners-device"] });
    },
  });
};

// ✅ Fetch All Banners
export const useGetBanners = () =>
  useQuery<any[]>({
    queryKey: ["banners"],
    queryFn: bannerService.getBanners,
  });

// ✅ Get Single Banner
export const useSingleBanner = (id: string | number) =>
  useQuery({
    queryKey: ["banner", id],
    queryFn: () => bannerService.getSingleBanner(id),
    enabled: !!id,
  });

// ✅ Get Category Banners
export const useBannersByDevice = (deviceType: string) =>
  useQuery<any[]>({
    queryKey: ["banners-device", deviceType],
    queryFn: () => bannerService.getBannersByDevice(deviceType),
    enabled: !!deviceType,
  });

export const useToggleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string | number; isActive: boolean }) =>
      bannerService.toggleBannerStatus(variables.id, { isActive: variables.isActive }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners-device"] });
    },
  });
};
