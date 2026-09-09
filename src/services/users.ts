import api from "./api";
import type { ChangePasswordRequest, UpdateUserRequest, User } from "../types/user";
import type { ChangePasswordRequest, QuestionnaireResponse, UpdateUserRequest, User } from "../types/user";
import type { QuestionnaireRequest } from "../types/product";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserRequest): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, data);
  return response.data;
};

export const changePassword = async (id: string, data: ChangePasswordRequest): Promise<void> => {
  await api.put(`/users/${id}/password`, data);
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const updateUserRole = async (id: string, role: string): Promise<User> => {
  const response = await api.put<User>(`/users/${id}/role`, { role });
  return response.data;
};

export const getMyQuestionnaire = async (): Promise<QuestionnaireResponse> => {
  const response = await api.get<QuestionnaireResponse>("/users/me/questionnaire");
  return response.data;
};

export const saveMyQuestionnaire = async (data: QuestionnaireRequest): Promise<QuestionnaireResponse> => {
  const response = await api.post<QuestionnaireResponse>("/users/me/questionnaire", data);
  return response.data;
};

