import mongoose from "mongoose";

export interface IGist extends mongoose.Document {
  title: string;
  slug: string;
  markdownContent: string;
  createdAt: Date;
  updatedAt: Date;
}

const GistSchema = new mongoose.Schema<IGist>(
  {
    title: {
      type: String,
      required: [true, "Document title is required"],
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: [true, "Document slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 110,
    },
    markdownContent: {
      type: String,
      required: [true, "Markdown content is required"],
      maxlength: 150_000,
    },
  },
  {
    timestamps: true,
  },
);

GistSchema.index({ slug: 1 }, { unique: true });
GistSchema.index({ updatedAt: -1 });

const Gist = mongoose.models.Gist || mongoose.model<IGist>("Gist", GistSchema);

export default Gist;
