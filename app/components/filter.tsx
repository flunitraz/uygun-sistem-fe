import React, { useState, useEffect } from "react";
import { Select, Button, Typography } from "antd";
import { getUniqueValues } from "../utils/getUniqueValues";
import { Prod } from "../utils/Prod";

const { Text } = Typography;

type Props = {
  prods: Prod[];
  filteredInfo: any;
  setFilteredInfo: any;
};

export default function Filter({
  prods,
  filteredInfo,
  setFilteredInfo,
}: Props) {
  const [temp, setTemp] = useState(filteredInfo);

  const handleChange = (key: string) => (value: string[]) => {
    setTemp((prev:any) => ({ ...prev, [key]: value }));
  };

  const handleFilter = () => {
    setFilteredInfo(temp);
  };

  useEffect(() => {
    setTemp(filteredInfo);
  }, [filteredInfo]);

  return (
    <div className="bg-white h-min rounded-lg shadow-lg min-w-64 max-w-64 p-4">
      <Text>Islemci</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Islemci seç"
        onChange={handleChange("islemci")}
        options={getUniqueValues(prods, "islemci")}
        value={temp.islemci}
      />
      <Text>Ekran Karti</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Ekran Karti seç"
        onChange={handleChange("ekran_karti")}
        options={getUniqueValues(prods, "ekran_karti")}
        value={temp.ekran_karti}
      />
      <Text>Ram</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Ram seç"
        onChange={handleChange("ram")}
        options={getUniqueValues(prods, "ram")}
        value={temp.ram}
      />
      <Text>Depolama</Text>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Depolama seç"
        onChange={handleChange("depolama")}
        options={getUniqueValues(prods, "depolama")}
        value={temp.depolama}
      />
      <Button className="mt-2" onClick={handleFilter}>
        Filtrele
      </Button>
    </div>
  );
}
