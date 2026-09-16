import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden px-4 py-10 sm:min-h-[460px] sm:px-6 lg:min-h-[500px]"
    >
      {/* Original photo brightness — no full-image dark overlay */}
      <Image
        src="/images/hero-wedding.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/* Smaller, lighter content panel */}
      <div className="w-full max-w-2xl rounded-2xl border border-white/25 bg-black/30 px-5 py-7 text-center sm:px-8 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-100">
          Dream · Plan · Celebrate
        </p>

        <h1
          id="hero-heading"
          className="mt-3 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Find Your Perfect Wedding
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white sm:text-lg">
          Discover venues, photographers and more for your special day.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/vendors"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Find Vendors
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/create-listing"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/60 bg-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Join as Vendor
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}