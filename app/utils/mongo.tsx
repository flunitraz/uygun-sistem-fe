const mongoose = require("mongoose");

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

export const Data = mongoose.models.prods || mongoose.model("prods", dataSchema);