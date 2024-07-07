import axios from "axios";
var cron = require("node-cron");
const mongoose = require("mongoose");
require("dotenv").config();

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

const updateDb = async () => {
  try {
    const response = await axios.get(
      "https://uygun-sistem-be.onrender.com/scrape/incehesap"
    );
    const fetchedData = response.data;

    await Data.deleteMany({});
    await Data.insertMany(fetchedData);
    console.log("Data fetched successfully and saved to MongoDB");
  } catch (error) {
    console.error("Error fetching data or saving to MongoDB");
    throw error;
  }
};

cron.schedule("0 * * * *", async () => {
  try {
    await updateDb();
  } catch (error) {
    console.error("Failed to fetch data in cron job");
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
