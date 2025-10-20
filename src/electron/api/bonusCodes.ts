import {
  IBonusCodeResponse,
  IBonusCodesResponse,
  IBonusCodesPaginatedResponse,
  GetBonusCodesParams,
} from "../interfaces/IBonusCode.js";
import axiosInstance from "./axiosInstance.js";

export const getBonusCodes = async (params?: GetBonusCodesParams) => {
  try {
    const response = await axiosInstance.get<IBonusCodesPaginatedResponse>("/bonus-codes", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 20,
        sortBy: params?.sortBy || "startDate",
        order: params?.order || "desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bonus codes:", error);
    throw error;
  }
};

export const getActiveBonusCodes = async () => {
  try {
    const response = await axiosInstance.get<IBonusCodesResponse>("/bonus-codes/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching active bonus codes:", error);
    throw error;
  }
};

export const getBonusCodeById = async (codeId: string) => {
  try {
    const response = await axiosInstance.get<IBonusCodeResponse>(`/bonus-codes/${codeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bonus code ${codeId}:`, error);
    throw error;
  }
};
