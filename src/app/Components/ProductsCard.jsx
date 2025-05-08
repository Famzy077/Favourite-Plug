import Link from "next/link";

const ProductCard = ({ product }) => {
  if (!product) {
    console.warn("undefined 'product in card'");
    return null;
  }

  return (
    <div className="p-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center items-center mb-1">
          <img
          src={product.image}
          alt={product.name}
          className="w-[60%] h-[fit] object-fit rounded-lg"
          />
        </div>
        <h2 className="text-xl font-bold cursor-pointer text-center">{product.name}</h2>
        <p className="text-gray-600 text-sm">{product.description.slice(0, 80)}...</p>
      </Link>
    </div>
  );
};

export default ProductCard;