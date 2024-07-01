import React, { useState, useEffect } from "react";
import { Select, Button, Typography, InputNumber } from "antd";
import { getUniqueValues } from "../utils/getUniqueValues";
import { Prod } from "../utils/Prod";

const { Text } = Typography;

type Props = {
  prods: Prod[];
  setFilteredProds: any
};

export default function Filter({
  prods,
  setFilteredProds
}: Props) {

  const [selectedIslemci, setSelectedIslemci] = useState<string[]>([]);
  const [selectedEkranKarti, setSelectedEkranKarti] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedDepolama, setSelectedDepolama] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  
  const handleChange = (value: string[], type: string) => {
    switch (type) {
      case "islemci":
        setSelectedIslemci(value);
        break;
      case "ekran_karti":
        setSelectedEkranKarti(value);
        break;
      case "ram":
        setSelectedRam(value);
        break;
      case "depolama":
        setSelectedDepolama(value);
        break;
      default:
        break;
    }
  };

  const handleFilter = () => {
    const filtered = prods.filter((prod) => {
      const islemciMatch =
        selectedIslemci.length === 0 || selectedIslemci.includes(prod.islemci);
      const ekranKartiMatch =
        selectedEkranKarti.length === 0 ||
        selectedEkranKarti.includes(prod.ekran_karti);
      const ramMatch =
        selectedRam.length === 0 || selectedRam.includes(prod.ram);
      const depolamaMatch =
        selectedDepolama.length === 0 || selectedDepolama.includes(prod.depolama);
      const priceMatch =
        (minPrice === undefined || Number(prod.fiyat) >= minPrice) &&
        (maxPrice === undefined || Number(prod.fiyat) <= maxPrice);

      return islemciMatch && ekranKartiMatch && ramMatch && depolamaMatch && priceMatch;
    });

    setFilteredProds(filtered);
  };
  const handleMinPriceChange = (value: number | null) => {
    value && setMinPrice(value);
  };

  const handleMaxPriceChange = (value: number | null) => {
    value && setMaxPrice(value);
  };

  return (
    <div className="bg-white h-min rounded-lg shadow-lg min-w-64 max-w-64 p-4">
      <Text>Islemci</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Islemci seç"
        onChange={(value) => handleChange(value, "islemci")}
        options={getUniqueValues(prods, "islemci")}
      />
      <Text>Ekran Karti</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Ekran Karti seç"
        onChange={(value) => handleChange(value, "ekran_karti")}
        options={getUniqueValues(prods, "ekran_karti")}
      />
      <Text>Ram</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Ram seç"
        onChange={(value) => handleChange(value, "ram")}
        options={getUniqueValues(prods, "ram")}
      />
      <Text>Depolama</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Depolama seç"
        onChange={(value) => handleChange(value, "depolama")}
        options={getUniqueValues(prods, "depolama")}
      />
      <Text>Min Fiyat</Text>
      <InputNumber
        style={{ width: "100%" }}
        placeholder="Min Fiyat"
        onChange={handleMinPriceChange}
      />
      <Text>Max Fiyat</Text>
      <InputNumber
        style={{ width: "100%" }}
        placeholder="Max Fiyat"
        onChange={handleMaxPriceChange}
      />
            <Button className="mt-2" onClick={handleFilter}>
        Filtrele
      </Button>
    </div>
  );
}
