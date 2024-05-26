"use client";
import data from "./mockdata.json";
import { useRouter } from "next/navigation";
import React from "react";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TfiAlignJustify } from "react-icons/tfi";
import { ListView } from "./components/listView";
import { Pagination } from "./components/pagination";
interface prod {
  islemci: string;
  ram: string;
  ekran_karti: string;
  depolama: string;
  fiyat: string;
  satici: string;
  img: string;
  url: string;
}

export default function Home() {
  const router = useRouter();
  const [prods, setProds] = React.useState(data as prod[]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedState = prods.slice(startIndex, endIndex);
  const totalPages = Math.ceil(prods.length / 10);

  return (
    <div className="flex gap-4">
      <div className="w-[320px] bg-white rounded-lg flex flex-col p-2">
        filter
      </div>
      <div className="w-full">
        <div className="flex justify-end mb-2">
          <div className="bg-white rounded flex gap-2 p-2">
            <TfiAlignJustify />
            <TfiLayoutGrid3 />
          </div>
        </div>
        {ListView(paginatedState, router)}
        {Pagination(
          prods,
          startIndex,
          endIndex,
          currentPage,
          totalPages,
          setCurrentPage
        )}
      </div>
    </div>
  );
}
