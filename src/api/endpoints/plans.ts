import apiClient from '@/api/axios';
import { PlanCreateRequest, Plan, PlanListResponse } from '@/api/types/plan';

export const createPlan = async (planData: PlanCreateRequest): Promise<Plan> => {
  const response = await apiClient.post<Plan>('/plans/create', planData);
  return response.data;
};

export const getPlans = async (): Promise<PlanListResponse> => {
  const response = await apiClient.get<PlanListResponse>('/plans/list');
  return response.data;
};
