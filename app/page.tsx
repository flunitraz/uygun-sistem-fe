import { Prod } from "./utils/Prod";
import ListView from "./components/listView";
import Filter from "./components/filter";
import TableTopBar from "./components/tableTopBar";
import axios from "axios";
// async function getServerSideProps() {
//   const res = await axios.get("/api/getProds");
//   const repo: Prod[] = await res.data();
//   return repo;
// }
// const getServerSideProps = async () => {
//   try {
//     const response = await axios.get(process.env.URL+"/api/getProds");
//     return(response.data);
//   } catch (error) {
//     console.error("Error fetching data");
//     throw error;
//   }
// };
export default async function Page() {
// const prods = await getServerSideProps();
const prods = [{} as Prod]

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
