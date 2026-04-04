import mongoose from "mongoose";

export interface IExperienceGalleryImage extends mongoose.Document {
  experienceSlug: string;
  imageUrl: string;
  publicId: string;
  caption?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceGallerySchema = new mongoose.Schema<IExperienceGalleryImage>(
  {
    experienceSlug: {
      type: String,
      required: [true, "Experience slug is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
    caption: {
      type: String,
      trim: true,
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

// Efficient retrieval by slug in order
ExperienceGallerySchema.index({ experienceSlug: 1, order: 1 });

export default mongoose.models.ExperienceGalleryImage ??
  mongoose.model<IExperienceGalleryImage>(
    "ExperienceGalleryImage",
    ExperienceGallerySchema,
  );
