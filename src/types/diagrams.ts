/**
 * Mermaid diagram page types used by admin CRUD and public share pages.
 */

export interface DiagramPage {
  _id: string;
  title: string;
  slug: string;
  mermaidCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiagramListApiResponse {
  success: boolean;
  data: DiagramPage[];
}

export interface DiagramItemApiResponse {
  success: boolean;
  data: DiagramPage;
}
