import api from ".";

export interface Banner {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    active: boolean;
}

export const getBanners = async (): Promise<Banner[]> => {
    const response = await api.get("/banners");
    return response.data;
};

export const getAllBanners = async (): Promise<Banner[]> => {
    const response = await api.get("/banners/all");
    return response.data;
};

export const createBanner = async (formData: FormData): Promise<Banner> => {
    const response = await api.post("/banners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const updateBanner = async (bannerId: string, formData: FormData): Promise<Banner> => {
    const response = await api.patch(`/banners/${bannerId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteBanner = async (bannerId: string): Promise<void> => {
    await api.delete(`/banners/${bannerId}`);
};