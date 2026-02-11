import mongoose from "mongoose";

export interface IVisitor {
  count: number;
  lastUpdated: Date;
}

const VisitorSchema = new mongoose.Schema<IVisitor>({
  count: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Use 'visitors' as the collection name
export const Visitor =
  mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
