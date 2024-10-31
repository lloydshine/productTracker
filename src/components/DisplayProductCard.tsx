import { Product } from "../utils/globals";

export default function DisplayProductCard({ product }: { product: Product }) {
  return (
    <div className="relative w-full h-64 rounded-md overflow-hidden shadow-md transform transition duration-300 hover:scale-105 cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{
          backgroundImage: `url(${product.imageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 hover:opacity-70"></div>
      <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
        <h2 className="font-bold text-xl">{product.productName}</h2>
        <p className="text-sm text-gray-200 mt-1">{product.description}</p>
      </div>
    </div>
  );
}
