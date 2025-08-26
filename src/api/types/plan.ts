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