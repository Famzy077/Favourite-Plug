import Link from "next/link";

const ProductCard = ({ product }) => {
  if (!product) {
    console.warn("undefined 'product in card'");
    return null;
  }

  return (
    <div className="px-4 py-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center items-center mb-1">
          <img
          src={product.image}
          alt={product.name}
          className="w-[] max-sm:h-[120px] h-[100px] object-fit rounded-lg"
          />
        </div>
        <h2 className="text-sm font-bold cursor-pointer">{product.name.slice(0, 10)}...</h2>
        <div className="max-sm:flex max-sm:items-center max-sm:gap-2">
          <p className="text-gray-600 text-sm">₦{product.price}</p>
          <strike className="text-gray-600 relative max-sm:top-0 -top-1.5 text-sm">₦{product.oldPrice}</strike>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;