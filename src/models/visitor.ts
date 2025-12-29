import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
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
  mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
