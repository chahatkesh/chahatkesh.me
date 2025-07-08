import { NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import { Visitor } from "~/models/visitor";

export async function GET() {
  try {
    await dbConnect();
    
    // Find the visitor document, or create one if it doesn't exist
    const visitorData = await Visitor.findOne({});
    
    if (visitorData) {
      return NextResponse.json({ count: visitorData.count }, { status: 200 });
    } else {
      // Create a new document with initial count of 0
      const newVisitor = await Visitor.create({
        count: 0,
        lastUpdated: new Date()
      });
      return NextResponse.json({ count: newVisitor.count }, { status: 200 });
    }
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return NextResponse.json({ count: 0, error: 'Failed to get visitor count' }, { status: 200 });
  }
}
