import mongoose from "mongoose";

export interface ISharedFile extends mongoose.Document {
  fileName: string;
  fileUrl: string;
  publicId: string;
  format: string;
  bytes: number;
  resourceType: string;
  createdAt: Date;
  updatedAt: Date;
}

const SharedFileSchema = new mongoose.Schema<ISharedFile>(
  {
    fileName: {
      type: String,
      required: [true, "File name is required"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
    format: {
      type: String,
      default: "",
    },
    bytes: {
      type: Number,
      default: 0,
    },
    resourceType: {
      type: String,
      default: "auto",
    },
  },
  {
    timestamps: true,
  },
);

SharedFileSchema.index({ createdAt: -1 });

export default mongoose.models.SharedFile ||
  mongoose.model<ISharedFile>("SharedFile", SharedFileSchema);
