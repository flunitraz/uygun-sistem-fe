"use client";
import React, { useState, useRef, useEffect } from "react";
import { TfiLayoutGrid3, TfiAlignJustify } from "react-icons/tfi";
import ListView from "./components/listView";
import { Prod } from "./utils/Prod";
import Filter from "./components/filter";
import type { TourProps, RadioChangeEvent } from "antd";
import { Button, Tour, Radio, Select } from "antd";
import axios from "axios";
const optionsView = [
  {
    label: (
      <div className="translate-y-2">
        <TfiLayoutGrid3 />
      </div>
    ),
    value: "card",
  },
  {
    label: (
      <div className="translate-y-2">
        <TfiAlignJustify />
      </div>
    ),
    value: "list",
  },
];

export default function Home() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);
  const [view, setView] = useState("list");
  const [order, setOrder] = useState("default");

  const [prods, setProds] = useState<Prod[]>([]);
  const [filteredProds, setFilteredProds] = useState<Prod[]>([]);

  const onChangeView = ({ target: { value } }: RadioChangeEvent) => {
    setView(value);
  };

  const handleOrder = (value: string) => {
    setOrder(value);
    sortProducts(filteredProds, value);
  };

  const sortProducts = (products: Prod[], order: string) => {
    let sortedProds = [...products];
    if (order === "priceAsc") {
      sortedProds.sort((a, b) => Number(a.fiyat) - Number(b.fiyat));
    } else if (order === "priceDesc") {
      sortedProds.sort((a, b) => Number(b.fiyat) - Number(a.fiyat));
    }
    setFilteredProds(sortedProds);
  };

  const handleFilterChange = (filtered: Prod[]) => {
    setFilteredProds(filtered);
    sortProducts(filtered, order);
  };

  const getProds = async () => {
    try {
      const response = await axios.get("/api/getProds");
      setProds(response.data);
      setFilteredProds(response.data);
    } catch (error) {
      console.error("Error fetching data");
      throw error;
    }
  };

  const steps: TourProps["steps"] = [
    {
      title: "Filtrele",
      description: "Lorem ipsum",
      target: () => ref1.current,
    },
    {
      title: "Görünümü Değiştir",
      description: "Lorem ipsum",
      target: () => ref2.current,
    },
    {
      title: "Siralamayi Değiştir",
      description: "Lorem ipsum",
      target: () => ref3.current,
    },
  ];

  useEffect(() => {
    sortProducts(filteredProds, order);
  }, [order, prods]);
  useEffect(() => {
    getProds();
  }, []);
  return (
    <div className="w-full">
      <div className="flex justify-end gap-4 mb-2">
        <Button onClick={() => setOpen(true)}>?</Button>
        <Select
          ref={ref3}
          value={order}
          onChange={handleOrder}
          options={[
            { value: "default", label: "Varsayılan" },
            { value: "priceAsc", label: "En düşük fiyat" },
            { value: "priceDesc", label: "En yüksek fiyat" },
          ]}
        />
        <Radio.Group
          ref={ref2}
          options={optionsView}
          onChange={onChangeView}
          value={view}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className="flex gap-4">
        <div ref={ref1} className="h-min">
          <Filter setFilteredProds={handleFilterChange} prods={prods} />
        </div>
        {view === "list" ? <ListView state={filteredProds} /> : <>other</>}
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
}
