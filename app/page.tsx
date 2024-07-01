"use client";
import data from "./mockdata.json";
import React ,{ useState } from "react";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TfiAlignJustify } from "react-icons/tfi";
import ListView from "./components/listView";
import { Button } from "antd";
import { Prod } from "./utils/Prod";
import Filter from "./components/filter";
import { TableProps } from "antd";
type OnChange = NonNullable<TableProps<Prod>["onChange"]>;
type Filters = Parameters<OnChange>[1];

export default function Home() {
  const [prods, setProds] = React.useState(data as Prod[]);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  React.useEffect(()=>{console.log(filteredInfo)},[filteredInfo])

  return (
      <div className="w-full">
        <div className="flex justify-end mb-2">
          <Button >
            <TfiAlignJustify />
            <TfiLayoutGrid3 />
          </Button>
        </div>
        <div className="flex gap-4"> 
          <Filter filteredInfo={filteredInfo} setFilteredInfo={setFilteredInfo} prods={prods}></Filter>
        <ListView filteredInfo={filteredInfo} setFilteredInfo={setFilteredInfo} state={prods} /></div>
      
    </div>
  );
}
