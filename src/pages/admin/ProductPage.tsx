import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import Loading from "../Loading";
import Ratings from "../../components/Ratings";
import ProductForm from "../../forms/ProductForm";

export default function ProductPage() {
  const { id } = useParams();
  const { product, loading } = useProduct(id as string);
  if (loading) return <Loading />;
  if (!product) return <>Not Found</>;

  return (
    <main className="space-y-8">
      <section className="p-10">
        <Ratings productId={product.id} />
      </section>
      <section className="p-10">
        <ProductForm product={product} />
      </section>
    </main>
  );
}
