export interface StaffMemberRecord {
  id: string;
  name: string;
  subject: string;
  photo_url?: string | null;
  is_active: boolean;
  order_index?: number;
  created_at?: string;
}
