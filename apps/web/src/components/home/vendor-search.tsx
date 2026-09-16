const cities = [
    { value: "indore", label: "Indore" },
    { value: "bhopal", label: "Bhopal" },
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "jaipur", label: "Jaipur" },
];

const categories = [
    { value: "venues", label: "Wedding venues" },
    { value: "photographers", label: "Photographers" },
    { value: "makeup-artists", label: "Makeup artists" },
    { value: "decorators", label: "Decorators" },
    { value: "caterers", label: "Caterers" },
];

const selectClassName =
    "mt-2 min-h-12 w-full rounded-xl border border-pink-200 " +
    "bg-white px-4 py-3 text-base text-gray-800 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-pink-700";

export function VendorSearch() {
    return (
        <form
            action="/vendors"
            method="get"
            role="search"
            aria-label="Find wedding vendors"
            className="mt-8 grid w-full gap-4 rounded-2xl bg-white p-4 text-left shadow-lg sm:p-5 md:grid-cols-[1fr_1fr_auto] md:items-end"
        >
            <div>
                <label
                    htmlFor="vendor-category"
                    className="text-sm font-semibold text-gray-800"
                >
                    What are you looking for?
                </label>

                <select
                    id="vendor-category"
                    name="category"
                    defaultValue=""
                    className={selectClassName}
                >
                    <option value="">All categories</option>

                    {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    htmlFor="vendor-city"
                    className="text-sm font-semibold text-gray-800"
                >
                    Wedding city
                </label>

                <select
                    id="vendor-city"
                    name="city"
                    defaultValue=""
                    className={selectClassName}
                >
                    <option value="">All cities</option>

                    {cities.map((city) => (
                        <option key={city.value} value={city.value}>
                            {city.label}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="min-h-12 rounded-xl bg-pink-700 px-6 py-3 font-semibold whitespace-nowrap text-white transition-colors hover:bg-pink-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-700"
            >
                Find vendors
            </button>
        </form>
    );
}