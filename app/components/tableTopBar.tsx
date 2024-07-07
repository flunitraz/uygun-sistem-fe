"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Typography, Radio, Slider } from "antd";
import { sortProducts } from "../utils/sortProducts";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { TfiLayoutGrid3, TfiAlignJustify } from "react-icons/tfi";
import { setOrder } from "../store/app";
import type { RadioChangeEvent } from "antd";
const { Text } = Typography;
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

export default function TableTopBar() {
  const dispatch = useAppDispatch();
  const filteredProds = useAppSelector((state) => state.app.filteredProds);
  const [view, setView] = useState("list");
    const order = useAppSelector(state => state.app.order)
  const handleOrder = (value: string) => {
    dispatch(setOrder(value));
    sortProducts(dispatch, filteredProds, value);
  };


  const onChangeView = ({ target: { value } }: RadioChangeEvent) => {
    setView(value);
  };

  useEffect(() => {
    sortProducts(dispatch, filteredProds, order);
  }, [order]);

  return (
    <div className="flex justify-end gap-4 mb-2">
      <Button>?</Button>
      <Select
        value={order}
        onChange={handleOrder}
        options={[
          { value: "default", label: "Varsayılan" },
          { value: "priceAsc", label: "En düşük fiyat" },
          { value: "priceDesc", label: "En yüksek fiyat" },
        ]}
      />
      <Radio.Group
        options={optionsView}
        onChange={onChangeView}
        value={view}
        optionType="button"
        buttonStyle="solid"
      />

    </div>
  );
}
