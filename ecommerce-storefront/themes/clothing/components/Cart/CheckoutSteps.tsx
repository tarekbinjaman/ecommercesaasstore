import { FaCheck } from "react-icons/fa";

const STEPS = ["Cart", "Checkout", "Order placed"] as const;

/** Page heading + Cart → Checkout → Order placed progress. Same look as the other clothing banners. */
export default function CheckoutSteps({
  title,
  current,
}: {
  title: string;
  /** 0 = cart, 1 = checkout, 2 = order placed */
  current: 0 | 1 | 2;
}) {
  return (
    <section className="rounded-2xl bg-[#faf9f7] px-4 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          {title}
        </h1>

        <ol className="flex items-center gap-2 text-xs font-semibold sm:gap-3 sm:text-sm">
          {STEPS.map((step, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <li key={step} className="flex items-center gap-2 sm:gap-3">
                <span
                  aria-current={active ? "step" : undefined}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 ${
                    active
                      ? "bg-black text-white shadow-lg"
                      : done
                        ? "bg-white text-black ring-1 ring-gray-200"
                        : "text-gray-400"
                  }`}
                >
                  {done && <FaCheck className="h-2.5 w-2.5" />}
                  {step}
                </span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="h-px w-4 bg-gray-300 sm:w-8" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
