var cron = require("node-cron");
require("dotenv").config();
const mongoose = require("mongoose");
import { scraper } from "@/app/utils/scraper";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  islemci: String,
  ram: String,
  ekran_karti: String,
  depolama: String,
  fiyat: String,
  satici: String,
  img: String,
  url: String,
});

const Data = mongoose.models.prods || mongoose.model("prods", dataSchema);

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

const updateDb = async () => {
  try {
    const fetchedData = await scrapeProds();

    await Data.deleteMany({});
    await Data.insertMany(fetchedData);
    console.log("Data fetched successfully and saved to MongoDB");
  } catch (error) {
    console.error("Error fetching data or saving to MongoDB");
    throw error;
  }
};

cron.schedule("* * * * *", async () => {
  try {
    await updateDb();
  } catch (error) {
    console.error("Failed cron job");
  }
});

export async function GET() {
  try {
    const fetchedData = await Data.find({}).exec();
    return Response.json(fetchedData);
  } catch (error) {
    console.error("Failed to fetch data from MongoDB");
    throw error;
  }
}
