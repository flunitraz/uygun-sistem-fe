import axios from "axios";
const cheerio = require("cheerio");

import { Prod } from "./Prod";

export async function scraper() {
  const incehesapBaseUrl =
    "https://www.incehesap.com/hazir-sistemler-fiyatlari/stok/sayfa-";
  const incehesapData: Prod[] = [];

  try {
    const response = await axios.get(incehesapBaseUrl + "1");
    const $ = cheerio.load(response.data);

    const totalItemsText = $("div.flex.justify-between.space-x-3")
      .text()
      .trim()
      .split(" ")[3];
    const totalItems = parseInt(totalItemsText, 10);
    const lastPageNumber = Math.ceil(totalItems / 18);

    for (let i = 1; i <= lastPageNumber; i++) {
      const url = incehesapBaseUrl + i;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const prods = $("div.grid.grid-cols-2.gap-1").find("div.p-1.group");

      prods.each((index: number, element: string) => {
        try {
          const data = $(element).find("a").attr("data-product").split("|");
          const img =
            "https://www.incehesap.com" + $(element).find("img").attr("src");
          const url =
            "https://www.incehesap.com" + $(element).find("a").attr("href");

          const incehesapDict: Prod = {
            islemci: data[1].trim(),
            ram: data[2].trim(),
            ekran_karti: data.length === 5 ? data[3].trim() : "-",
            depolama:
              data.length === 5
                ? data[4].trim().split("Oyuncu")[0].split('"')[0].trim()
                : data[3].trim().split("Oyuncu")[0].split('"')[0].trim(),
            fiyat:
              data.length === 5
                ? data[4].split('price":')[1].split(",")[0].trim()
                : data[3].split('price":')[1].split(",")[0].trim(),
            satici: "incehesap.com",
            img: img,
            url: url,
          };

          incehesapData.push(incehesapDict);
        } catch (error) {
          console.error("Error extracting product data:", error);
        }
      });
    }
  } catch (error) {
    console.error("Error scraping incehesap.com:", error);
  }

  return incehesapData;
}
