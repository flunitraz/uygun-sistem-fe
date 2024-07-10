import { Prod } from "./utils/Prod";
import ListView from "./components/listView";
import Filter from "./components/filter";
import TableTopBar from "./components/tableTopBar";
import axios from "axios";
const getServerSideProps = async () => {
  try {
    const response = await axios.get(process.env.URL+"/api/getProds");
    return(response.data);
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
};
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
