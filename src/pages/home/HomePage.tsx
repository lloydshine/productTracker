import { useNavigate } from "react-router-dom";
import DisplayProductCard from "../../components/DisplayProductCard";
import { useProducts } from "../../hooks/useProducts";
import Loading from "../Loading";

export default function HomePage() {
  const { loading, products } = useProducts();

  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <main>
      <div className="flex gap-4 items-center mb-10">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div onClick={() => handleClick(product.id)}>
            <DisplayProductCard product={product} key={product.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
