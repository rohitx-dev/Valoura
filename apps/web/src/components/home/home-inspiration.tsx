import Image from "next/image";
import Link from "next/link";
import {
  FaSearch,
  FaRegHeart,
  FaRegCalendarAlt,
  FaGlassCheers,
} from "react-icons/fa";

const steps = [
  {
    title: "Search",
    description:
      "Explore vendors, venues and ideas based on your preferences.",
    icon: FaSearch,
    color: "bg-rose-100 text-rose-800",
  },
  {
    title: "Connect",
    description:
      "Get in touch with your favourite vendors and request quotes.",
    icon: FaRegHeart,
    color: "bg-orange-100 text-orange-800",
  },
  {
    title: "Plan",
    description:
      "Shortlist, compare and finalise the details of your celebration.",
    icon: FaRegCalendarAlt,
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Celebrate",
    description:
      "Sit back, relax and enjoy your special day!",
    icon: FaGlassCheers,
    color: "bg-violet-100 text-violet-800",
  },
];

const storyPhotos = [
  {
    src: "/images/home/wedding-hands.png",
    alt: "Wedding jewellery and henna details",
    rotation: "-rotate-6",
  },
  {
    src: "/images/home/wedding-venue.png",
    alt: "An outdoor wedding venue",
    rotation: "-rotate-3",
  },
  {
    src: "/images/home/wedding-flowers.png",
    alt: "Wedding flowers and table decorations",
    rotation: "rotate-6",
  },
];

export function HomeInspiration() {
  return (
    <>
      {/* Wedding inspiration banner */}
      <section
        aria-labelledby="wedding-stories-heading"
        className="bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 overflow-hidden rounded-xl bg-linear-to-r from-[#fff7f8] to-[#fceef0] px-6 py-8 md:grid-cols-2 md:px-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-800">
                Get inspired
              </p>

              <h2
                id="wedding-stories-heading"
                className="mt-2 font-serif text-2xl font-semibold text-slate-800 sm:text-3xl"
              >
                Real Weddings. Real Stories.
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                Explore beautiful wedding ideas and gather inspiration
                for your own special day.
              </p>

              <button
                type="button"
                disabled
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 text-xs font-semibold text-pink-800 disabled:cursor-not-allowed"
              >
                Wedding stories coming soon
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 px-2 py-4 sm:gap-3">
              {storyPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className={`relative aspect-[4/5] w-[30%] max-w-36 shrink-0 rounded-sm border-4 border-white shadow-md ${photo.rotation} ${
                    index === 1 ? "z-10 -translate-y-2" : ""
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 144px, 28vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four-step process */}
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="scroll-mt-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-12 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-800">
            How it works
          </p>

          <h2
            id="how-it-works-heading"
            className="mt-2 font-serif text-2xl font-semibold text-slate-800 sm:text-3xl"
          >
            Plan your wedding in 4 simple steps
          </h2>

          <ol className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {steps.map(({ title, description, icon: Icon, color }, index) => (
              <li
                key={title}
                className={`relative ${
                  index > 0
                    ? "lg:border-l lg:border-pink-100 lg:pl-7"
                    : ""
                } lg:pr-7`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}
                >
                  <Icon size={19} aria-hidden="true" />
                </span>

                <h3 className="mt-4 text-sm font-semibold text-slate-800">
                  {index + 1}. {title}
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-xs text-slate-500">
            Vendor discovery is available in this preview. Enquiries and
            planning features are coming later.
          </p>
        </div>
      </section>

      {/* Testimonial banner */}
      <section
        aria-labelledby="testimonials-heading"
        className="relative isolate overflow-hidden"
      >
        <Image
          src="/images/home/testimonial-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/50"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-9 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-100">
              Our couples say
            </p>

            <h2
              id="testimonials-heading"
              className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl"
            >
              Real people. Real experiences.
            </h2>
          </div>

          <figure className="rounded-xl bg-white p-5 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/home/couple-01.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-pink-800">
                  Sample testimonial
                </p>

                <blockquote className="text-sm leading-6 text-slate-700">
                  “Having our favourite wedding ideas and vendors in
                  one place made planning feel so much simpler.”
                </blockquote>

                <figcaption className="mt-3 text-xs font-semibold text-slate-800">
                  Riya &amp; Arjun
                  <span className="font-normal text-slate-500">
                    {" "}· Fictional demo couple
                  </span>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}