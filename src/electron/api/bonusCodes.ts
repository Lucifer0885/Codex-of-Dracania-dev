import { IBonusCodeResponse, IBonusCodesResponse } from "../interfaces/IBonusCode.js";
import axiosInstance from "./axiosInstance.js";

export const getBonusCodes = async () => {
  try {
    const response = await axiosInstance.get<IBonusCodesResponse>("/bonus-codes");
    console.log("Fetched bonus codes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching bonus codes:", error);
    throw error;
  }
};

export const getActiveBonusCodes = async () => {
  try {
    const response = await axiosInstance.get<IBonusCodesResponse>("/bonus-codes/active");
    console.log("Fetched active bonus codes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching active bonus codes:", error);
    throw error;
  }
};

export const getBonusCodeById = async (codeId: string) => {
  try {
    const response = await axiosInstance.get<IBonusCodeResponse>(`/bonus-codes/${codeId}`);
    console.log(`Fetched bonus code ${codeId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bonus code ${codeId}:`, error);
    throw error;
  }
};
