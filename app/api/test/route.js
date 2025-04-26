import clientPromise from "../../../lib/mongodb.js";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); 
    const data = await db.collection("country").find({}).toArray();
    return Response.json(data);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500 }
    );
  }
}
