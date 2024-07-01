"use client";
import data from "./mockdata.json";
import React, { useState, useRef } from "react";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TfiAlignJustify } from "react-icons/tfi";
import ListView from "./components/listView";
import { Button, Tour } from "antd";
import { Prod } from "./utils/Prod";
import Filter from "./components/filter";
import type { TourProps } from "antd";

export default function Home() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Filtrele",
      description: "Lorem ipsum ",
      target: () => ref1.current,
    },
    {
      title: "Gorunumu Degistir",
      description: "Lorem ipsum ",
      target: () => ref2.current,
    },
  ];
  const [prods, setProds] = React.useState(data as Prod[]);
  const [filteredProds, setFilteredProds] = React.useState(data as Prod[]);
  return (
    <div className="w-full">
      <div className="flex justify-end gap-4 mb-2">
        <Button onClick={() => setOpen(true)}>?</Button>
        <Button ref={ref2}>
          <TfiAlignJustify />
          <TfiLayoutGrid3 />
        </Button>
      </div>
      <div className="flex gap-4">
        <div ref={ref1} className="h-min">
          <Filter setFilteredProds={setFilteredProds} prods={prods}></Filter>
        </div>
        <ListView state={filteredProds} />
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
}
