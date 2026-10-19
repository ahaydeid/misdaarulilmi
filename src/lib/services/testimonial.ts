export interface TestimonialRecord {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar_url?: string | null;
  is_active: boolean;
  order_index?: number;
  created_at?: string;
}
