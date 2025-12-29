import mongoose from "mongoose";

export interface IGalleryImage extends mongoose.Document {
  title: string;
  location: string;
  date: string;
  aspectRatio: "square" | "portrait" | "landscape" | "big-square";
  imageUrl: string;
  publicId: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new mongoose.Schema<IGalleryImage>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    aspectRatio: {
      type: String,
      enum: ["square", "portrait", "landscape", "big-square"],
      default: "square",
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Create index for efficient queries
GalleryImageSchema.index({ createdAt: -1 });
GalleryImageSchema.index({ isFeatured: 1 });
GalleryImageSchema.index({ order: 1 });

export default mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
