"use client";

const categories = [
  {
    id: "residential",
    title: "Residential Interiors",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80",
  },
  {
    id: "commercial",
    title: "Commercial Spaces",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
  },
  {
    id: "hospitality",
    title: "Hospitality Design",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    id: "luxury",
    title: "Luxury Interiors",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-24 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Explore Interiors
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mt-2">
            Design-led spaces for every kind of
            <br />
            lifestyle.
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <h3 className="text-xs tracking-[0.15em] text-[#1a1a1a] uppercase">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
