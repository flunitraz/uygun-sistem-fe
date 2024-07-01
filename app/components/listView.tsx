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
};

export default function ListView({ state }: props) {
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);
  };

  const columns: TableColumnsType<Prod> = [
    {
      dataIndex: "img",
      key: "img",
      render: (dataIndexValue, record) => (
        <img className="w-32" src={dataIndexValue} alt={record.img} />
      ),
    },
    {
      title: "Ozellikler",
      render: (record) => (
        <Descriptions
          bordered
          items={[
            {
              label: "islemci",
              children: record.islemci,
              span: 3,
            },
            {
              label: "ekran karti",
              children: record.ekran_karti,
              span: 3,
            },
            {
              label: "ram",
              children: record.ram,
              span: 2,
            },

            {
              label: "depolama",
              children: record.depolama,
            },
            {
              label: "satici",
              span: 2,
              children: (
                <a href={record.url} target="_blank">
                  {record.satici}
                </a>
              ),
            },
            {
              label: "fiyat",
              children: <b> {record.fiyat} TL</b>,
            },
          ]}
        />
      ),
    },
  ];
  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-lg ">
      <Table columns={columns} dataSource={state} onChange={handleChange} />
    </div>
  );
}
