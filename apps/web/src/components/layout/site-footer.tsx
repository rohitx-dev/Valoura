import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Vendors", href: "/vendors" },
  { label: "Categories", href: "/categories" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

const supportLinks = [
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const socialIcons = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "Instagram", icon: FaInstagram },
  { label: "YouTube", icon: FaYoutube },
  { label: "X", icon: FaXTwitter },
];

const headingClassName =
  "mb-4 border-b-2 border-pink-200 pb-2.5 text-xs font-semibold uppercase tracking-widest text-gray-900";

const linkClassName =
  "inline-block rounded-sm transition-colors duration-200 hover:text-pink-700 " +
  "motion-safe:transition-all motion-safe:hover:translate-x-1 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-700";

export function SiteFooter() {
  return (
    <footer className="bg-linear-to-br from-[#fff7fb] to-[#f8edf2] px-6 pt-14 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Decorative top divider */}
        <div
          aria-hidden="true"
          className="mb-12 h-px w-full bg-linear-to-r from-transparent via-pink-300 to-transparent"
        />

        {/* Top footer */}
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo and about */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Valoura home"
              className="mb-4 inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-700"
            >
              <span className="relative block h-20 w-48">
                <Image
                  src="/images/logo.png"
                  alt="Valoura"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Your one-stop destination to find, compare and book the
              best wedding vendors across India.
            </p>

            {/* Social icons — enable when profile URLs are available */}
            <div className="flex flex-nowrap gap-2">
              {socialIcons.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  disabled
                  aria-label={`${label} — coming soon`}
                  title={`${label} — coming soon`}
                  className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-pink-200 text-pink-700"
                >
                  <Icon size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className={headingClassName}>
              Quick Links
            </h2>

            <ul className="space-y-3 text-sm text-gray-600">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* For vendors */}
          <nav aria-labelledby="footer-vendors">
            <h2 id="footer-vendors" className={headingClassName}>
              For Vendors
            </h2>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/create-listing"
                  className={`${linkClassName} inline-flex items-center gap-2`}
                >
                  List Your Business
                  <span className="rounded bg-pink-100 px-1.5 py-0.5 text-[10px] font-semibold text-pink-700">
                    FREE
                  </span>
                </Link>
              </li>

              <li>
                <Link href="/login" className={linkClassName}>
                  Vendor Login
                </Link>
              </li>

              <li>
                <Link
                  href="/vendor-guidelines"
                  className={linkClassName}
                >
                  Vendor Guidelines
                </Link>
              </li>

              <li>
                <Link href="/help-center" className={linkClassName}>
                  Help Center
                </Link>
              </li>
            </ul>
          </nav>

          {/* Support */}
          <nav aria-labelledby="footer-support">
            <h2 id="footer-support" className={headingClassName}>
              Support
            </h2>

            <ul className="space-y-3 text-sm text-gray-600">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="min-w-0">
            <h2 className={headingClassName}>Contact Us</h2>

            {/* Replace sample contact details before launch. */}
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-base text-pink-700"
                >
                  📞
                </span>
                <span className="pt-1">+91 98765 43210</span>
              </li>

              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-base text-pink-700"
                >
                  ✉
                </span>
                <span className="min-w-0 break-words pt-1">
                  support@valoura.example
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-base text-pink-700"
                >
                  📍
                </span>
                <span className="pt-1">
                  Indore, Madhya Pradesh
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-base text-pink-700"
                >
                  ⏰
                </span>
                <span className="pt-1">Mon – Sun, 9 AM – 8 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col gap-4 border-t border-pink-200 py-5 text-sm text-gray-600 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} Valoura. All rights reserved.
          </p>

          <nav
            aria-label="Legal navigation"
            className="flex flex-wrap items-center gap-5"
          >
            <Link href="/privacy-policy" className={linkClassName}>
              Privacy
            </Link>

            <span aria-hidden="true" className="text-pink-300">
              |
            </span>

            <Link
              href="/terms-and-conditions"
              className={linkClassName}
            >
              Terms
            </Link>

            <span aria-hidden="true" className="text-pink-300">
              |
            </span>

            <Link href="/sitemap" className={linkClassName}>
              Sitemap
            </Link>
          </nav>

          <p>
            Made with{" "}
            <span className="text-base text-pink-700">
              <span aria-hidden="true">❤</span>
              <span className="sr-only">love</span>
            </span>{" "}
            for your special day
          </p>
        </div>
      </div>
    </footer>
  );
}