import { useAppSelector } from "../../Store/store";
import TreadingSingleProductCard from "./TreadingProductCard";
const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
    {products?.map((product) => (
      <TreadingSingleProductCard key={product._id} {...product} />
    ))}
  </div>
);


export default TreadingProductPage;
