import apiClient from '@/api/axios';

export interface PlanCreateRequest {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  billing_cycle?: number;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billing_cycle: number;
  status: number;
  created_at: string;
}

export interface PlanListResponse {
  plans: Plan[];
}

export const createPlan = async (planData: PlanCreateRequest): Promise<Plan> => {
  const response = await apiClient.post<Plan>('/plans', planData);
  return response.data;
};

export const getPlans = async (): Promise<PlanListResponse> => {
  const response = await apiClient.get<PlanListResponse>('/plans');
  return response.data;
};
