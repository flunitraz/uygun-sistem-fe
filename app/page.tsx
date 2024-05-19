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
  const [prods, setProds] = React.useState(data as prod[]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [selectedProcessors, setSelectedProcessors] = React.useState<string[]>(
    []
  );
  const [processorFilter, setProcessorFilter] = React.useState<string>("");

  const [selectedGraphicsCards, setSelectedGraphicsCards] = React.useState<
    string[]
  >([]);
  const [graphicsCardFilter, setGraphicsCardFilter] =
    React.useState<string>("");

  const [selectedRAM, setSelectedRAM] = React.useState<string[]>([]);
  const [ramFilter, setRAMFilter] = React.useState<string>("");

  const [selectedStorage, setSelectedStorage] = React.useState<string[]>([]);
  const [storageFilter, setStorageFilter] = React.useState<string>("");

  const [selectedSellers, setSelectedSellers] = React.useState<string[]>([]);
  const [sellerFilter, setSellerFilter] = React.useState<string>("");

  const uniqueProcessors = Array.from(
    new Set(prods.map((prod) => prod.islemci))
  );
  const uniqueGraphicsCards = Array.from(
    new Set(prods.map((prod) => prod.ekran_karti))
  );
  const uniqueRAMs = Array.from(new Set(prods.map((prod) => prod.ram)));
  const uniqueStorages = Array.from(
    new Set(prods.map((prod) => prod.depolama))
  );
  const uniqueSellers = Array.from(new Set(prods.map((prod) => prod.satici)));

  const filteredUniqueProcessors = uniqueProcessors.filter((processor) =>
    processor.toLowerCase().includes(processorFilter.toLowerCase())
  );
  const filteredUniqueGraphicsCards = uniqueGraphicsCards.filter(
    (graphicsCard) =>
      graphicsCard.toLowerCase().includes(graphicsCardFilter.toLowerCase())
  );
  const filteredUniqueRAMs = uniqueRAMs.filter((ram) =>
    ram.toLowerCase().includes(ramFilter.toLowerCase())
  );
  const filteredUniqueStorages = uniqueStorages.filter((storage) =>
    storage.toLowerCase().includes(storageFilter.toLowerCase())
  );
  const filteredUniqueSellers = uniqueSellers.filter((seller) =>
    seller.toLowerCase().includes(sellerFilter.toLowerCase())
  );

  const filteredProds = prods.filter((prod) => {
    const processorFilterCondition =
      selectedProcessors.length === 0 ||
      selectedProcessors.includes(prod.islemci);
    const graphicsCardFilterCondition =
      selectedGraphicsCards.length === 0 ||
      selectedGraphicsCards.includes(prod.ekran_karti);
    const RAMFilterCondition =
      selectedRAM.length === 0 || selectedRAM.includes(prod.ram);
    const storageFilterCondition =
      selectedStorage.length === 0 || selectedStorage.includes(prod.depolama);
    const sellerFilterCondition =
      selectedSellers.length === 0 || selectedSellers.includes(prod.satici);

    return (
      processorFilterCondition &&
      graphicsCardFilterCondition &&
      RAMFilterCondition &&
      storageFilterCondition &&
      sellerFilterCondition
    );
  });

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedState = filteredProds.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProds.length / 10);
  const handleProcessorChange = (processor: string) => {
    setSelectedProcessors((prevSelected) =>
      prevSelected.includes(processor)
        ? prevSelected.filter((p) => p !== processor)
        : [...prevSelected, processor]
    );
    setCurrentPage(1);
  };

  const handleGraphicsCardChange = (graphicsCard: string) => {
    setSelectedGraphicsCards((prevSelected) =>
      prevSelected.includes(graphicsCard)
        ? prevSelected.filter((g) => g !== graphicsCard)
        : [...prevSelected, graphicsCard]
    );
    setCurrentPage(1);
  };

  const handleRAMChange = (ram: string) => {
    setSelectedRAM((prevSelected) =>
      prevSelected.includes(ram)
        ? prevSelected.filter((r) => r !== ram)
        : [...prevSelected, ram]
    );
    setCurrentPage(1);
  };

  const handleStorageChange = (storage: string) => {
    setSelectedStorage((prevSelected) =>
      prevSelected.includes(storage)
        ? prevSelected.filter((s) => s !== storage)
        : [...prevSelected, storage]
    );
    setCurrentPage(1);
  };

  const handleSellerChange = (seller: string) => {
    setSelectedSellers((prevSelected) =>
      prevSelected.includes(seller)
        ? prevSelected.filter((s) => s !== seller)
        : [...prevSelected, seller]
    );
    setCurrentPage(1);
  };
  return (
    <div className="flex gap-4">
      <div className="w-[320px] bg-white rounded-lg flex flex-col p-2">
        İşlemci
        <div className="flex flex-col max-h-[240px] overflow-auto">
          <input
            type="text"
            placeholder="İşlemci Ara"
            value={processorFilter}
            onChange={(e) => setProcessorFilter(e.target.value)}
            className="w-full border rounded"
          />

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value=""
                checked={selectedProcessors.length === 0}
                onChange={() => {
                  setSelectedProcessors([]);
                  setCurrentPage(1);
                }}
              />
              Hepsi
            </label>
            {filteredUniqueProcessors.map((processor) => (
              <label key={processor} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={processor}
                  checked={selectedProcessors.includes(processor)}
                  onChange={() => handleProcessorChange(processor)}
                />
                {processor}
              </label>
            ))}
          </div>
        </div>
        Ekran Kartı
        <div className="flex flex-col max-h-[240px] overflow-auto">
          <input
            type="text"
            placeholder="Ekran Kartı Ara"
            value={graphicsCardFilter}
            onChange={(e) => setGraphicsCardFilter(e.target.value)}
            className="w-full border rounded"
          />

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value=""
                checked={selectedGraphicsCards.length === 0}
                onChange={() => {
                  setSelectedGraphicsCards([]);
                  setCurrentPage(1);
                }}
              />
              Hepsi
            </label>
            {filteredUniqueGraphicsCards.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={selectedGraphicsCards.includes(item)}
                  onChange={() => handleGraphicsCardChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        Ram
        <div className="flex flex-col max-h-[240px] overflow-auto">
          <input
            type="text"
            placeholder="Ram Ara"
            value={ramFilter}
            onChange={(e) => setRAMFilter(e.target.value)}
            className="w-full border rounded"
          />

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value=""
                checked={selectedRAM.length === 0}
                onChange={() => {
                  setSelectedRAM([]);
                  setCurrentPage(1);
                }}
              />
              Hepsi
            </label>
            {filteredUniqueRAMs.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={selectedRAM.includes(item)}
                  onChange={() => handleRAMChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        Depolama
        <div className="flex flex-col max-h-[240px] overflow-auto">
          <input
            type="text"
            placeholder="Depolama Ara"
            value={storageFilter}
            onChange={(e) => setStorageFilter(e.target.value)}
            className="w-full border rounded"
          />

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value=""
                checked={selectedStorage.length === 0}
                onChange={() => {
                  setSelectedStorage([]);
                  setCurrentPage(1);
                }}
              />
              Hepsi
            </label>
            {filteredUniqueStorages.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={selectedStorage.includes(item)}
                  onChange={() => handleStorageChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        Satıcı
        <div className="flex flex-col max-h-[240px] overflow-auto">
          <input
            type="text"
            placeholder="Satıcı Ara"
            value={sellerFilter}
            onChange={(e) => setSellerFilter(e.target.value)}
            className="w-full border rounded"
          />

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value=""
                checked={selectedSellers.length === 0}
                onChange={() => {
                  setSelectedSellers([]);
                  setCurrentPage(1);
                }}
              />
              Hepsi
            </label>
            {filteredUniqueSellers.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={selectedSellers.includes(item)}
                  onChange={() => handleSellerChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
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
          <div
            key={index}
            className="grid grid-cols-8 gap-4 border-b-2 border-secondary bg-white text-secondary"
          >
            <div className="flex items-center p-4">
              <img className="h-32" src={data.img} alt="Product Image" />
            </div>
            <div className="flex items-center">{data.islemci}</div>
            <div className="flex items-center">{data.ekran_karti}</div>
            <div className="flex items-center">{data.ram}</div>
            <div className="flex items-center">{data.depolama}</div>
            <div className="flex items-center">{data.satici}</div>
            <div className="flex items-center">{data.fiyat}</div>
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

        {filteredProds.length > 0 ? (
          <div className="flex justify-between py-2 px-4 bg-white rounded-b-lg">
            <div className="text-secondary">
              {filteredProds.length} adet sonuçtan {startIndex + 1}-
              {endIndex > filteredProds.length
                ? filteredProds.length
                : endIndex}{" "}
              arasındakiler gösteriliyor.
            </div>
            <div className="flex gap-2">
              <button
                className="bg-primary text-white px-2 py-1 rounded-lg"
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              >
                {"<"}
              </button>
              <select
                className="text-primary"
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              >
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
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
          <div className="py-4 rounded-b-lg flex justify-center bg-white">Kayıt Bulunamadı</div>
        )}
      </div>
    </div>
  );
}
