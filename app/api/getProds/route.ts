import { Data } from "@/app/utils/mongo";

export async function GET() {
  try {
    const fetchedData = await Data.find({}).exec();
    return Response.json(fetchedData);
  } catch (error) {
    console.error("Failed to fetch data from MongoDB");
    throw error;
  }
}
