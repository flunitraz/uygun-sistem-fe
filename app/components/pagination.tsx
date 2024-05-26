export const Pagination = (
    prods: any,
    startIndex: any,
    endIndex: any,
    currentPage: any,
    totalPages:any,
    setCurrentPage: any,

  ) => {
    return(
        <>
         {prods.length > 0 ? (
          <div className="flex justify-between py-2 px-4 bg-white rounded-b-lg">
            <div className="text-secondary">
              {prods.length} adet sonuçtan {startIndex + 1}-
              {endIndex > prods.length
                ? prods.length
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
          <div className="py-4 rounded-b-lg flex justify-center bg-white">
            Kayıt Bulunamadı
          </div>
        )}</>
    )
  }