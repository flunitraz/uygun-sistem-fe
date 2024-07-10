import axios from "axios";
const cheerio = require("cheerio");

import { Prod } from "./Prod";

export async function scraper() {
  const scrapedData: Prod[] = [];

  const incehesapBaseUrl =
    "https://www.incehesap.com/hazir-sistemler-fiyatlari/stok/sayfa-";

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
            ekran_karti: data.length === 5 ? data[3].trim() : "Yok",
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

          scrapedData.push(incehesapDict);
        } catch (error) {
          console.error("Error extracting product data:", error);
        }
      });
    }
  } catch (error) {
    console.error("Error scraping incehesap.com:", error);
  }
  const gencergamingBaseUrl =
    "https://www.gencergaming.com/hazir-sistemler?siralama=akilli-siralama&list=stoktakiler&sayfa=";

  try {
    const response = await axios.get(gencergamingBaseUrl + "1");
    const $ = cheerio.load(response.data);

    const lastPageNumber = $("li.page-item").text().slice(-1);

    for (let i = 1; i <= lastPageNumber; i++) {
      const url = gencergamingBaseUrl + i;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const prods = $("div.card-product-inner");

      prods.each((index: number, element: string) => {
        const islemci = $(element)
          .find('li.d-flex img[src*="islemci"] + span.value')
          .first()
          .text()
          .trim();
        const ekran_karti = $(element)
          .find('li.d-flex img[src*="ekran_kartı"] + span.value')
          .first()
          .text()
          .trim();
        const ram = $(element)
          .find('li.d-flex img[src*="ram"] + span.value')
          .first()
          .text()
          .trim();
        const depolama = $(element)
          .find('li.d-flex img[src*="depolama"] + span.value')
          .first()
          .text()
          .trim();
        const fiyat = $(element)
          .find("div.sale-price")
          .text()
          .split(",")[0]
          .replace(".", "");
        const url = $(element).find("a.btn.btn-cart").attr("href");
        const img = $(element).find("div.image img").attr("data-src");

        const gencergamingDict: Prod = {
          islemci,
          ram,
          ekran_karti: ekran_karti == "" ? "Yok" : ekran_karti,
          depolama,
          fiyat,
          satici: "gencergaming.com",
          img,
          url,
        };
        scrapedData.push(gencergamingDict);
      });
    }
  } catch (error) {
    console.error("Error scraping incehesap.com:", error);
  }
  return scrapedData;
}