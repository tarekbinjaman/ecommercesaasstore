
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Electronics',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793092037/45bf894c9af3756ca516a569966252f2_rmd4sr.jpg',
    href: '/categories/electronics',
    color: '#3978d4',
  },
  {
    name: 'Fashion',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793092178/1de754327334ffdbd2b2ea509a933c48_fzfemq.jpg',
    href: '/categories/fashion',
    color: '#d58cae',
  },
  {
    name: 'Beauty',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793092265/bcec3e1c52c07308a1114b83ea415c97_x5ksik.jpg',
    href: '/categories/beauty',
    color: '#d85c7d',
  },
  {
    name: 'Home',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793092463/01ce71440848a8e5fd0f73cfb45ef937_h77ygs.jpg',
    href: '/categories/home',
    color: '#61a88e',
  },
  {
    name: 'Accessories',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793092668/c292a172269f65b3536668c44d516f58_paybuk.jpg',
    href: '/categories/accessories',
    color: '#e5a13c',
  },
  {
    name: 'Sports',
    image: 'https://res.cloudinary.com/drvwvre57/image/upload/v1793092764/7f419552d84230971510a800369af511_gf4fgw.jpg',
    href: '/categories/sports',
    color: '#648dd5',
  },
];

const CategorySection = () => {
  return (
    <section className="mx-auto w-full px-4 py-6 sm:w-11/12 sm:px-0 lg:w-10/12">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative min-w-0 overflow-hidden rounded-2xl
              border border-white bg-white p-1.5
              shadow-[0_3px_12px_rgba(30,60,100,0.08)]
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md"
            style={{
              borderBottomColor: category.color,
              borderBottomWidth: '3px',
            }}
          >
            {/* Category image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f4f6fb]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Category name and arrow */}
            <div className="flex items-center justify-between gap-1 px-1 py-2">
              <span className="truncate text-xs font-semibold text-[#10264d] sm:text-sm">
                {category.name}
              </span>

              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center
                  rounded-full border text-sm transition-colors"
                style={{
                  color: category.color,
                  borderColor: `${category.color}55`,
                  backgroundColor: `${category.color}0D`,
                }}
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
