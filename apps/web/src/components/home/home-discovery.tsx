"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBuilding,
  FaCamera,
  FaGem,
  FaTshirt,
  FaUserTie,
  FaUtensils,
  FaLeaf,
  FaMusic,
  FaEnvelope,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";

const categories = [
  {
    label: "Venues",
    slug: "venues",
    icon: FaBuilding,
    color: "bg-orange-50 text-orange-800",
  },
  {
    label: "Wedding Photography",
    slug: "photographers",
    icon: FaCamera,
    color: "bg-emerald-50 text-emerald-800",
  },
  {
    label: "Makeup & Hair",
    slug: "makeup-artists",
    icon: FaGem,
    color: "bg-rose-50 text-rose-800",
  },
  {
    label: "Bridal Wear",
    slug: "bridal-wear",
    icon: FaTshirt,
    color: "bg-orange-50 text-orange-800",
  },
  {
    label: "Groom Wear",
    slug: "groom-wear",
    icon: FaUserTie,
    color: "bg-slate-100 text-slate-700",
  },
  {
    label: "Catering",
    slug: "caterers",
    icon: FaUtensils,
    color: "bg-violet-50 text-violet-800",
  },
  {
    label: "Decor & Themes",
    slug: "decorators",
    icon: FaLeaf,
    color: "bg-amber-50 text-amber-800",
  },
  {
    label: "Entertainment",
    slug: "entertainment",
    icon: FaMusic,
    color: "bg-teal-50 text-teal-800",
  },
  {
    label: "Invites & Stationery",
    slug: "invitations",
    icon: FaEnvelope,
    color: "bg-orange-50 text-orange-800",
  },
];

const vendors = [
  {
    slug: "royal-heritage",
    name: "The Royal Heritage",
    category: "Wedding venue",
    city: "Jaipur",
    rating: "4.8",
    reviews: 120,
    price: "₹2,50,000",
    image: "/images/vendors/royal-heritage.png",
    imageAlt: "Wedding venue illuminated for an evening celebration",
    popular: true,
  },
  {
    slug: "shutter-stories",
    name: "Shutter Stories",
    category: "Wedding photographer",
    city: "Delhi",
    rating: "4.9",
    reviews: 200,
    price: "₹75,000",
    image: "/images/vendors/shutter-stories.png",
    imageAlt: "Photographer capturing a wedding couple",
    popular: false,
  },
  {
    slug: "blush-beyond",
    name: "Blush & Beyond",
    category: "Makeup artist",
    city: "Mumbai",
    rating: "4.8",
    reviews: 150,
    price: "₹15,000",
    image: "/images/vendors/blush-beyond.png",
    imageAlt: "Bridal makeup and styling",
    popular: false,
  },
  {
    slug: "florista",
    name: "Florista",
    category: "Decor & styling",
    city: "Bangalore",
    rating: "4.7",
    reviews: 95,
    price: "₹1,50,000",
    image: "/images/vendors/florista.png",
    imageAlt: "Floral decorations at a wedding celebration",
    popular: false,
  },
];

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 " +
  "focus-visible:outline-pink-700";

export function HomeDiscovery() {
  // Preview interaction only; saved vendors are not persisted yet.
  const [savedVendors, setSavedVendors] = useState<string[]>([]);

  function toggleSavedVendor(slug: string) {
    setSavedVendors((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }

  return (
    <>
      {/* Wedding categories */}
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="scroll-mt-6 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-800">
                Explore categories
              </p>

              <h2
                id="categories-heading"
                className="mt-2 font-serif text-2xl font-semibold text-slate-800 sm:text-3xl"
              >
                Find everything you need
              </h2>
            </div>

            <Link
              href="/categories"
              className={`rounded-sm text-sm font-medium text-pink-700 hover:text-pink-900 ${focusClass}`}
            >
              View all categories <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-5 lg:grid-cols-9">
            {categories.map(({ label, slug, icon: Icon, color }) => (
              <Link
                key={slug}
                href={`/vendors?category=${slug}`}
                className={`group flex flex-col items-center rounded-lg text-center ${focusClass}`}
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full transition-transform motion-safe:group-hover:-translate-y-1 ${color}`}
                >
                  <Icon size={23} aria-hidden="true" />
                </span>

                <span className="mt-3 max-w-28 text-xs leading-5 font-medium text-slate-700 group-hover:text-pink-800">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured vendors */}
      <section
        aria-labelledby="featured-vendors-heading"
        className="bg-[#fcf5f6]"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-800">
                Featured vendors
              </p>

              <h2
                id="featured-vendors-heading"
                className="mt-2 font-serif text-2xl font-semibold text-slate-800 sm:text-3xl"
              >
                Meet your wedding dream team
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore venues and creative professionals for your special day.
              </p>
            </div>

            <Link
              href="/vendors"
              className={`rounded-sm text-sm font-medium text-pink-700 hover:text-pink-900 ${focusClass}`}
            >
              View all vendors <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((vendor) => {
              const isSaved = savedVendors.includes(vendor.slug);

              return (
                <article
                  key={vendor.slug}
                  className="relative rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link
                    href={`/vendors/${vendor.slug}`}
                    className={`group block overflow-hidden rounded-xl ${focusClass}`}
                  >
                    <div className="relative aspect-[8/5] overflow-hidden">
                      <Image
                        src={vendor.image}
                        alt={vendor.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 284px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                      />

                      {vendor.popular && (
                        <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-orange-800">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-slate-800 group-hover:text-pink-800">
                        {vendor.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-600">
                        {vendor.category}
                      </p>

                      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                        <FaMapMarkerAlt
                          className="text-rose-400"
                          aria-hidden="true"
                        />
                        {vendor.city}
                      </p>

                      <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                        <FaStar
                          className="text-amber-500"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-slate-800">
                          {vendor.rating}
                          <span className="sr-only"> out of 5</span>
                        </span>
                        <span className="text-slate-600">
                          ({vendor.reviews} reviews)
                        </span>
                      </p>

                      <p className="mt-3 text-sm font-semibold text-slate-800">
                        {vendor.price}{" "}
                        <span className="text-xs font-normal text-slate-600">
                          onwards
                        </span>
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleSavedVendor(vendor.slug)}
                    aria-label={`Save ${vendor.name}`}
                    aria-pressed={isSaved}
                    className={`absolute top-1 right-1 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 ${focusClass}`}
                  >
                    {isSaved ? (
                      <FaHeart
                        size={18}
                        className="text-pink-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaRegHeart size={18} aria-hidden="true" />
                    )}
                  </button>
                </article>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-slate-600">
            Demo listings — names, prices and reviews are fictional.
          </p>
        </div>
      </section>
    </>
  );
}