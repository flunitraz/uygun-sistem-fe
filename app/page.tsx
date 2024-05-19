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
      <div className="grid grid-cols-8 gap-4 border-b-2 border-secondary py-2 bg-white text-primary rounded-t-lg">
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
        <div className="grid grid-cols-8 gap-4 border-b-2 border-secondary bg-white text-secondary">
          <div className="flex items-center p-4">
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
              className="bg-primary text-white p-2 rounded-lg"
              onClick={() => router.push(data.url)}
            >
              Görüntüle
            </button>
          </div>
        </div>
      ))}

      {prods.length > 0 ? (
        <div className="flex justify-between py-2 px-4 bg-white rounded-b-lg">
          <div className="text-secondary">
            {prods.length} adet sonuçtan {startIndex + 1}-
            {endIndex + 1 > prods.length ? prods.length : endIndex + 1}{" "}
            arasındakiler gösteriliyor.
          </div>
          <div className="flex gap-2">
            <button
              className="bg-primary text-white px-2 py-1 rounded-lg"
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              {"<"}
            </button>
            <select
              className="text-primary"
              value={currentPage}
              onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                )
              )}
            </select>
            <button className="text-secondary">{"/ " + totalPages}</button>
            <button
              className="bg-primary text-white px-2 py-1 rounded-lg"
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
            >
              {">"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-center">Kayıt Bulunamadı</div>
      )}
    </div>
  );
}
