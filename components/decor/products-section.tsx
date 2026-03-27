"use client";

const products = [
  {
    id: 1,
    name: "Serving Platter",
    description: "Handcrafted wooden serving platter",
    price: "2,499",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&q=80",
  },
  {
    id: 2,
    name: "Wooden Bowl Set",
    description: "Set of 3 nested wooden bowls",
    price: "1,899",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&q=80",
  },
  {
    id: 3,
    name: "Cheese Board",
    description: "Premium acacia wood cheese board",
    price: "1,299",
    image: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?w=500&q=80",
  },
  {
    id: 4,
    name: "Spice Box",
    description: "Traditional wooden spice container",
    price: "999",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&q=80",
  },
  {
    id: 5,
    name: "Serving Tray",
    description: "Rectangular serving tray with handles",
    price: "1,799",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80",
  },
  {
    id: 6,
    name: "Salad Bowl",
    description: "Large wooden salad mixing bowl",
    price: "2,199",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&q=80",
  },
];

export function ProductsSection() {
  return (
    <section className="py-24 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mt-4">
            Handcrafted with Care
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Each piece is carefully crafted by skilled artisans using sustainable wood and traditional techniques.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#f5f5f0] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <button className="bg-white text-[#1a1a1a] px-6 py-2 text-xs tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-serif text-xl text-[#1a1a1a] mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {product.description}
              </p>
              <p className="text-[#1a1a1a] font-medium">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-[#1a1a1a] text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#c9a962] transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
