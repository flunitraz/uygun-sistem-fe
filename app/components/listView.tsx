import { Prod } from "../utils/Prod";
import { getUniqueValues } from "../utils/getUniqueValues";
import React, { useState } from "react";

import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table, Descriptions } from "antd";

type props = {
  state: Prod[];
};

export default function ListView({ state }: props) {
  const columns: TableColumnsType<Prod> = [
    {
      dataIndex: "img",
      key: "img",
      render: (dataIndexValue, record) => (
        <div className="flex place-content-center">
          <img width={128} src={dataIndexValue} alt={record.img} />
        </div>
      ),
    },
    {
      render: (record) => (
        <Descriptions
          bordered
          size="small"
          items={[
            {
              label: "İşlemci",
              children: record.islemci,
              span: 3,
            },
            {
              label: "Ekran Kartı",
              children: record.ekran_karti,
              span: 3,
            },
            {
              label: "Ram",
              children: record.ram,
              span: 2,
            },

            {
              label: "Depolama",
              children: record.depolama,
            },
            {
              label: "Satıcı",
              span: 2,
              children: (
                <a href={record.url} target="_blank">
                  {record.satici}
                </a>
              ),
            },
            {
              label: "Fiyat",
              children: <b> {record.fiyat} TL</b>,
            },
          ]}
        />
      ),
    },
  ];
  return (
    <Table
      size="small"
      showHeader={false}
      className="w-full"
      columns={columns}
      dataSource={state}
    />
  );
}
