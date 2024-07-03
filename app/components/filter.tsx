import React, { useState, useEffect } from "react";
import { Select, Button, Typography, InputNumber, Slider } from "antd";
import { getUniqueValues } from "../utils/getUniqueValues";
import { Prod } from "../utils/Prod";

const { Text } = Typography;

type Props = {
  prods: Prod[];
  setFilteredProds: any;
};

export default function Filter({
  prods,
  setFilteredProds,
}: Props) {
  const [selectedIslemci, setSelectedIslemci] = useState<string[]>([]);
  const [selectedEkranKarti, setSelectedEkranKarti] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedDepolama, setSelectedDepolama] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(150000);

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

  const handleFilter = (param?: string) => {
    const disabled = prods.filter((prod) => {
      const islemciMatch =
        param === "islemci" ||
        selectedIslemci.length === 0 ||
        selectedIslemci.includes(prod.islemci);
      const ekranKartiMatch =
        param === "ekran_karti" ||
        selectedEkranKarti.length === 0 ||
        selectedEkranKarti.includes(prod.ekran_karti);
      const ramMatch =
        param === "ram" ||
        selectedRam.length === 0 ||
        selectedRam.includes(prod.ram);
      const depolamaMatch =
        param === "depolama" ||
        selectedDepolama.length === 0 ||
        selectedDepolama.includes(prod.depolama);
      const priceMatch =
        (minPrice === undefined || Number(prod.fiyat) >= minPrice) &&
        (maxPrice === undefined || Number(prod.fiyat) <= maxPrice);

      return (
        islemciMatch &&
        ekranKartiMatch &&
        ramMatch &&
        depolamaMatch &&
        priceMatch
      );
    });
    if (param) {
      return [...new Set(disabled.map((item: any) => item[param]))];
    } else {
      return setFilteredProds(disabled);
    }
  };

  useEffect(() => {
    handleFilter();
    console.log(handleFilter("islemci"));
  }, [
    selectedIslemci,
    selectedEkranKarti,
    selectedRam,
    selectedDepolama,
    minPrice,
    maxPrice,
  ]);

  return (
    <div className="h-min min-w-64 max-w-64 p-4 flex flex-col gap-2">
      <Text>Islemci</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Islemci seç"
        onChange={(value) => handleChange(value, "islemci")}
        options={getUniqueValues(prods, "islemci", handleFilter("islemci"))}
      />
      <Text>Ekran Karti</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Ekran Karti seç"
        onChange={(value) => handleChange(value, "ekran_karti")}
        options={getUniqueValues(
          prods,
          "ekran_karti",
          handleFilter("ekran_karti")
        )}
      />
      <Text>Ram</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Ram seç"
        onChange={(value) => handleChange(value, "ram")}
        options={getUniqueValues(prods, "ram", handleFilter("ram"))}
      />
      <Text>Depolama</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Depolama seç"
        onChange={(value) => handleChange(value, "depolama")}
        options={getUniqueValues(prods, "depolama", handleFilter("depolama"))}
      />
      <div className="flex justify-between">
        <Text>Fiyat</Text>
        <Text>
          {minPrice}-{maxPrice}TL
        </Text>
      </div>
      <Slider
        onChange={(value: Array<number>) => {
          setMinPrice(value[0]);
          setMaxPrice(value[1]);
        }}
        range
        min={0}
        max={150000}
        defaultValue={[minPrice, maxPrice]}
      />
    </div>
  );
}
