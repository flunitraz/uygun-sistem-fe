"use client";
import data from "./mockdata.json";
import { useRouter } from "next/navigation";
import React from "react";
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
  const [prods, setProds] = React.useState(data as [prod]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedState = prods.slice(startIndex, endIndex);

  const totalPages = Math.ceil(prods.length / itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-8 gap-4 border-b-2 border-orange-200 py-2">
        <div></div>
        <div>İşlemci</div>
        <div>Ekran Kartı</div>
        <div>Ram</div>
        <div>Depolama</div>
        <div>Satıcı</div>
        <div>Fiyat</div>
        <div></div>
      </div>
      {paginatedState.map((data, index) => (
        <div className="grid grid-cols-8 gap-4 border-b-2 border-orange-200">
          <div className="flex items-center">
            <img className=" h-32" src={data.img}></img>{" "}
          </div>
          <div className="flex items-center"> {data.islemci} </div>
          <div className="flex items-center"> {data.ekran_karti} </div>
          <div className="flex items-center"> {data.ram} </div>
          <div className="flex items-center"> {data.depolama} </div>
          <div className="flex items-center"> {data.satici} </div>
          <div className="flex items-center"> {data.fiyat} </div>
          <div className="flex items-center">
            <button
              className="bg-orange-400 text-white p-2 rounded-lg"
              onClick={() => router.push(data.url)}
            >
              Görüntüle
            </button>
          </div>
        </div>
      ))}

{prods.length > 0 ? (
        <div className="flex justify-between mt-4">
          <div className="mt-3">
            {prods.length} adet sonuçtan {startIndex + 1}-
            {endIndex + 1 > prods.length
              ? prods.length
              : endIndex + 1}{" "}
            arasındakiler gösteriliyor.
          </div>
         <div>
          <button></button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-center">Kayıt Bulunamadı</div>
      )}
    </div>
  );
}
