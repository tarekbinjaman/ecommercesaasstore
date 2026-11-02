const products = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 180,
  },
  {
    id: 2,
    name: 'Fresh Milk',
    price: 90,
  },
  {
    id: 3,
    name: 'Organic Vegetables',
    price: 250,
  },
  {
    id: 4,
    name: 'Fresh Bananas',
    price: 120,
  },
];

export default function TopSelling() {
  return (
    <section className="bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Selling
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Popular products our customers love.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex h-40 items-center justify-center rounded-md bg-gray-100 text-gray-400">
                Product Image
              </div>

              <h3 className="font-semibold text-gray-900">
                {product.name}
              </h3>

              <p className="mt-2 font-medium text-[#0F6E56]">
                ৳{product.price}
              </p>

              <button className="mt-3 w-full rounded-md bg-[#0F6E56] py-2 text-sm font-medium text-white">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}