import { PlusIcon } from "lucide-react";
import DisplayProductCard from "../../components/DisplayProductCard";
import Modal from "../../components/Modal";
import ProductForm from "../../forms/ProductForm";
import { useProducts } from "../../hooks/useProducts";
import { useToggle } from "../../hooks/useToggle";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const { state, toggle } = useToggle(false);
  const { loading, products } = useProducts();

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/admin/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <main className="p-10">
      <div className="flex gap-8 items-center mb-10">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-blue-600 p-1 rounded-md" onClick={toggle}>
          <PlusIcon />
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div onClick={() => handleClick(product.id)}>
            <DisplayProductCard product={product} key={product.id} />
          </div>
        ))}
      </div>
      <Modal state={state} toggle={toggle}>
        <ProductForm />
      </Modal>
    </main>
  );
}
