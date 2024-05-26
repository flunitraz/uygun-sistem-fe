export const ListView = (
    state: Array<object>,
    router: any
  ) => {
    return(
        <>
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
        {state.map((data:any, index) => (
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


        </>
    )
  }