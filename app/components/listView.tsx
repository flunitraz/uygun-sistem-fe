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
        <img className="w-32" src={dataIndexValue} alt={record.img} />
      ),
    },
    {
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
      <Table showHeader={false} className="w-full" columns={columns} dataSource={state} />
  );
}
