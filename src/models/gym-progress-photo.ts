import mongoose from "mongoose";

export interface IGymProgressPhoto extends mongoose.Document {
  date: string;
  imageUrl: string;
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const GymProgressPhotoSchema = new mongoose.Schema<IGymProgressPhoto>(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
  },
  {
    timestamps: true,
  },
);

GymProgressPhotoSchema.index({ date: -1 });

export default mongoose.models.GymProgressPhoto ||
  mongoose.model<IGymProgressPhoto>("GymProgressPhoto", GymProgressPhotoSchema);
