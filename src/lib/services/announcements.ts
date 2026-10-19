export interface AnnouncementRecord {
  id: string;
  slug: string;
  title: string;
  date: string;
  tag: string;
  author: string;
  excerpt: string;
  content_html: string;
  is_active: boolean;
  created_at: string;
}

export type AnnouncementInsert = Omit<AnnouncementRecord, "id" | "created_at">;
export type AnnouncementUpdate = Partial<AnnouncementInsert>;
