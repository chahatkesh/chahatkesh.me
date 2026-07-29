/**
 * Markdown gist/document types for admin CRUD and public sharing.
 */

export interface GistDocument {
  _id: string;
  title: string;
  slug: string;
  markdownContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface GistListApiResponse {
  success: boolean;
  data: GistDocument[];
}

export interface GistItemApiResponse {
  success: boolean;
  data: GistDocument;
}
