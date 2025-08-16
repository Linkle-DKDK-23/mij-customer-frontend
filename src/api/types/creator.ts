export interface CreatorCreate {
  name: string;
  first_name_kana?: string;
  last_name_kana?: string;
  address?: string;
  phone_number: string;
  birth_date?: string;
  gender_slug: string[];
}

export interface CreatorUpdate {
  name?: string;
  first_name_kana?: string;
  last_name_kana?: string;
  address?: string;
  phone_number?: string;
  birth_date?: string;
  category_id?: string;
  country_code?: string;
}

export interface CreatorOut {
  user_id: string;
  name?: string;
  first_name_kana?: string;
  last_name_kana?: string;
  address?: string;
  phone_number?: string;
  birth_date?: string;
  status: number;
  category_id?: string;
  country_code?: string;
  tos_accepted_at?: string;
  created_at: string;
}

export interface IdentityVerificationCreate {
  user_id: string;
}

export interface IdentityVerificationOut {
  id: string;
  user_id: string;
  status: number;
  checked_at?: string;
  notes?: string;
}

export interface IdentityDocumentCreate {
  verification_id: string;
  kind: number;
  storage_key: string;
}

export interface IdentityDocumentOut {
  id: string;
  verification_id: string;
  kind: number;
  storage_key: string;
  created_at: string;
}
