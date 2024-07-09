import { scraper } from "@/app/utils/scraper";
import { Data } from "@/app/utils/mongo";

async function scrapeProds() {
  try {
    const data = await scraper();
    console.log(
      "Successfully scraped " + data.length + " products with cheerio"
    );
    return data;
  } catch (error) {
    console.error("Error scraping products:", error);
  }
}

async function updateDb() {
  try {
    const fetchedData = await scrapeProds();
    await Data.deleteMany({});
    await Data.insertMany(fetchedData);
    return "Data fetched successfully and saved to MongoDB";
  } catch (error) {
    console.error("Error fetching data or saving to MongoDB");
    throw error;
  }
}

export async function GET() {
  return updateDb();
}
