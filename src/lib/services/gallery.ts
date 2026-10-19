export interface GalleryItemRecord {
  id: string;
  type: "photo" | "video";
  title: string;
  category: string;
  date: string;
  desc?: string | null;
  src?: string | null;
  youtube_id?: string | null;
  images?: string[] | null;
  is_active: boolean;
  created_at?: string;
}
