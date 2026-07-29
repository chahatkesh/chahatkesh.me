import mongoose from "mongoose";

export interface IPlace extends mongoose.Document {
  name: string;
  location: string;
  shortNote?: string;
  visitedAt: Date;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new mongoose.Schema<IPlace>(
  {
    name: {
      type: String,
      required: [true, "Place name is required"],
      trim: true,
      maxlength: 140,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: 220,
    },
    shortNote: {
      type: String,
      trim: true,
      maxlength: 320,
      default: "",
    },
    visitedAt: {
      type: Date,
      required: [true, "Visit date is required"],
      index: true,
    },
    latitude: {
      type: Number,
      required: [true, "Latitude is required"],
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
      min: -180,
      max: 180,
    },
  },
  {
    timestamps: true,
  },
);

PlaceSchema.index({ visitedAt: -1, createdAt: -1 });

const Place =
  mongoose.models.Place || mongoose.model<IPlace>("Place", PlaceSchema);

export default Place;
