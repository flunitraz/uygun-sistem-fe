import { Prod } from "./utils/Prod";
import ListView from "./components/listView";
import Filter from "./components/filter";
import TableTopBar from "./components/tableTopBar";

async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/getProds");
  const repo: Prod[] = await res.json();
  return repo;
}

export default async function Page() {
const prods = await getServerSideProps();

  return (
    <>
      <TableTopBar />
      <div className="flex gap-2">
        <Filter prods={prods} />
        <ListView prods={prods} />
      </div>
    </>
  );
}
