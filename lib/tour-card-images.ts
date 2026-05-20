import { preferWebp } from "@/lib/optimized-image";

const card = (filename: string) => preferWebp(`/images/card-images/${filename}`);

/** Card thumbnails under /public/images/card-images — flyers stay on the detail page. */
export const tourCardImageBySlug: Record<string, string> = {
  "shogran-siri-paye-khanpur": card("shogran.png"),
  "kumrat-4-days": card("kumrat.png"),
  "fairy-meadows-5-days": card("fairy.png"),
  "swat-bahrain-malam-kalam": card("swat.png"),
  "naran-valley-saif-malook": card("naran.png"),
  "azad-kashmir-taobat": card("taobutt.png"),
  "hunza-skardu-deosai-8-days": card("skardu-hunza-deosai.png"),
  "hunza-naltar-china-border-5-days-besham": card("hunza-b.png"),
  "hunza-naltar-china-border-5-days-naran": card("hunza-n.png"),
  "kashmir-neelum-sharda-arang-kel-3-days": card("kashmir.png"),
  "skardu-manthoka-deosai-basho-6-days": card("skardu.png"),
};

export function getTourCardImage(tour: { slug: string; heroImage: string }) {
  return tourCardImageBySlug[tour.slug] ?? preferWebp(tour.heroImage);
}
