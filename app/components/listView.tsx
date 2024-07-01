import { Prod } from "../utils/Prod";
import { getUniqueValues } from "../utils/getUniqueValues";
import React, { useState } from "react";

import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table, Descriptions } from "antd";

type OnChange = NonNullable<TableProps<Prod>["onChange"]>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type props = {
  state: Prod[];
  filteredInfo: any;
  setFilteredInfo: any;
};

export default function ListView({
  state,
  filteredInfo,
  setFilteredInfo,
}: props) {
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns: TableColumnsType<Prod> = [
    {
      title: "Resim",
      dataIndex: "img",
      key: "img",
      render: (dataIndexValue, record) => (
        <img className="w-64" src={dataIndexValue} alt={record.img} />
      ),
    },
    {
      title: "Ozellikler",
      render: (record) => (
        <Descriptions
          bordered
          items={[
            {
              key: "1",
              label: "islemci",
              children: record.islemci,
              span: 2,
            },
            {
              key: "2",
              label: "ram",
              children: record.ram,
            },
            {
              key: "3",
              label: "ekran karti",
              children: record.ekran_karti,
              span: 2,
            },

            {
              key: "4",
              label: "depolama",
              children: record.depolama,
            },
            {
              key: "5",
              label: "satici",
              span: 2,
              children: record.satici,
            },
            {
              key: "5",
              label: "goruntule",
              children: <a href={record.url} target="_blank">tikla</a>,
            },
          ]}
        />
      ),
      children: [
        {
          title: "Islemci",
          dataIndex: "islemci",
          key: "islemci",
          filteredValue: filteredInfo.islemci || null,
          onFilter: (value, record) => record.islemci.includes(value as string),
          ellipsis: true,
          hidden: true,
        },
        {
          title: "Ekran Karti",
          dataIndex: "ekran_karti",
          key: "ekran_karti",
          filteredValue: filteredInfo.ekran_karti || null,
          onFilter: (value, record) =>
            record.ekran_karti.includes(value as string),
          ellipsis: true,
          hidden: true,
        },
        {
          title: "Ram",
          dataIndex: "ram",
          key: "ram",
          filteredValue: filteredInfo.ram || null,
          onFilter: (value, record) => record.ram.includes(value as string),
          ellipsis: true,
          hidden: true,
        },
        {
          title: "Depolama",
          dataIndex: "depolama",
          key: "depolama",
          filteredValue: filteredInfo.depolama || null,
          onFilter: (value, record) =>
            record.depolama.includes(value as string),
          ellipsis: true,
          hidden: true,
        },
      ],
    },
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      key: "fiyat",
      sorter: (a, b) => Number(a.fiyat) - Number(b.fiyat),
      sortOrder: sortedInfo.columnKey === "fiyat" ? sortedInfo.order : null,
      render: (dataIndexValue, record) => (
        <div className="w-16">{dataIndexValue} TL</div>
      ),
    },
  ];
  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg ">
      <Table columns={columns} dataSource={state} onChange={handleChange} />
    </div>
  );
}
