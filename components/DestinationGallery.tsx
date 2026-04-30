import Image from "next/image";
import { galleryImages } from "@/lib/tours";

export function DestinationGallery() {
  return (
    <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-4">
      {galleryImages.map((item, index) => (
        <div
          key={item.title}
          className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 ${
            index === 0 || index === 3 ? "md:col-span-2 md:row-span-2" : ""
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 text-xl font-black text-white">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}
