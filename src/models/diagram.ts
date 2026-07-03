import mongoose from "mongoose";

export interface IDiagram extends mongoose.Document {
  title: string;
  slug: string;
  mermaidCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const DiagramSchema = new mongoose.Schema<IDiagram>(
  {
    title: {
      type: String,
      required: [true, "Diagram title is required"],
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: [true, "Diagram slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
    mermaidCode: {
      type: String,
      required: [true, "Mermaid code is required"],
      maxlength: 50_000,
    },
  },
  {
    timestamps: true,
  },
);

DiagramSchema.index({ slug: 1 }, { unique: true });
DiagramSchema.index({ updatedAt: -1 });

const Diagram =
  mongoose.models.Diagram || mongoose.model<IDiagram>("Diagram", DiagramSchema);

export default Diagram;
