import { cn, currencyFormatter } from '@/lib/utils';

export default function ProductCard({ product, className }) {
  return (
    <a
      href={product.url}
      rel="noopener noreferrer nofollow"
      target="_blank"
      className={cn(
        'shadow rounded-lg overflow-hidden bg-white w-32 text-slate-900 block flex-shrink-0 snap-center',
        className,
      )}
    >
      <figure className="h-24 w-full bg-gray-300">
        <img
          src={product.photos[0]}
          alt={product.title}
          className="h-24 w-full object-cover object-center"
          loading="lazy"
        />
      </figure>
      <div className="px-2 py-1 inline-flex flex-col gap-1 text-xs">
        <p className="line-clamp-1">{product.title}</p>
        <p className="font-semibold">{currencyFormatter(product.price)}</p>
      </div>
    </a>
  );
}
