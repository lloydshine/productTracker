import { useState } from "react";
import { Product } from "../utils/globals";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";

export default function ProductForm({ product }: { product?: Product }) {
  const [productName, setProductName] = useState(product?.productName || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [previewUrl, setPreviewUrl] = useState(product?.imageUrl || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Set preview URL for image preview
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;
    const imageRef = ref(storage, `products/${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    setImageUrl(url);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image if a new one is selected
    const uploadedImageUrl = image ? await handleImageUpload() : imageUrl;

    const productData: Product = {
      id: product?.id || uuidv4(), // generate ID if not existing
      productName,
      description,
      imageUrl: uploadedImageUrl || "", // Use uploaded or existing image URL
    };

    try {
      const productRef = doc(firestore, "products", productData.id);
      await setDoc(productRef, productData);
      alert("Product saved successfully!");
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold text-lg mb-4">Product Form</h1>
      <main className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <section className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-white/80">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Product Name"
              className="p-2 rounded-md text-black"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-white/80">
              Product Description
            </label>
            <textarea
              id="description"
              placeholder="Product Description"
              className="p-2 h-[6rem] rounded-md text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-white/80">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
            />
          </div>
        </section>
        <section className="flex-1 flex flex-col gap-1">
          <label htmlFor="image" className="text-white/80">
            Product Preview
          </label>
          <div
            className="flex-1 h-[5rem] md:h-auto rounded-lg border"
            style={{
              borderStyle: "dashed",
              borderWidth: "2px",
              borderColor: "#ccc",
              backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </section>
      </main>
      <section className="mt-10 flex justify-end">
        <button type="submit" className="p-2 bg-blue-600 rounded-md">
          {product ? "Update Product" : "Add Product"}
        </button>
      </section>
    </form>
  );
}
