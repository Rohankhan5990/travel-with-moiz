import type { ReactNode } from "react";
import type { Tour } from "@/lib/tour-types";

function Block({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-5 sm:rounded-[2rem] sm:p-8">
      <h2 className="text-xl font-black text-white sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-slate-200 sm:mt-5 sm:space-y-3 sm:text-base">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-1.5 text-sm leading-7 marker:text-cyan-300 sm:space-y-2 sm:text-base sm:leading-8">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function TourDetailExtras({ tour }: { tour: Tour }) {
  const hasAny =
    (tour.packageDetail?.length ?? 0) > 0 ||
    (tour.pickupPoints?.length ?? 0) > 0 ||
    (tour.mealInfo?.length ?? 0) > 0 ||
    tour.bookingContact ||
    (tour.childrenPolicy?.length ?? 0) > 0 ||
    (tour.seatPolicy?.length ?? 0) > 0 ||
    (tour.equipment?.length ?? 0) > 0 ||
    (tour.registration?.length ?? 0) > 0 ||
    (tour.terms?.length ?? 0) > 0 ||
    (tour.notes?.length ?? 0) > 0;

  if (!hasAny) return null;

  return (
    <section className="px-4 pb-12 md:pb-16">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        {tour.packageDetail && tour.packageDetail.length > 0 && (
          <Block title="Package detail">
            <BulletList items={tour.packageDetail} />
          </Block>
        )}
        {tour.pickupPoints && tour.pickupPoints.length > 0 && (
          <Block title="Pick-up points">
            <BulletList items={tour.pickupPoints} />
          </Block>
        )}
        {tour.mealInfo && tour.mealInfo.length > 0 && (
          <Block title="Meals">
            <BulletList items={tour.mealInfo} />
          </Block>
        )}
        {tour.bookingContact && (
          <Block title="Booking">
            <p className="text-lg font-bold text-cyan-200">{tour.bookingContact}</p>
          </Block>
        )}
        {tour.childrenPolicy && tour.childrenPolicy.length > 0 && (
          <Block title="Children policy">
            <BulletList items={tour.childrenPolicy} />
          </Block>
        )}
        {tour.seatPolicy && tour.seatPolicy.length > 0 && (
          <Block title="Seat arrangement">
            <BulletList items={tour.seatPolicy} />
          </Block>
        )}
        {tour.equipment && tour.equipment.length > 0 && (
          <Block title="Equipment to bring">
            <BulletList items={tour.equipment} />
          </Block>
        )}
        {tour.registration && tour.registration.length > 0 && (
          <Block title="Registration">
            <BulletList items={tour.registration} />
          </Block>
        )}
        {tour.notes && tour.notes.length > 0 && (
          <Block title="Notes">
            <BulletList items={tour.notes} />
          </Block>
        )}
        {tour.terms && tour.terms.length > 0 && (
          <div className="md:col-span-2">
            <Block title="Terms & conditions">
              <BulletList items={tour.terms} />
            </Block>
          </div>
        )}
      </div>
    </section>
  );
}
