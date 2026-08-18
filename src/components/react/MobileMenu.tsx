import { useEffect, useId, useRef, useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
}

/**
 * The only interactive island on the page. Everything else on the Home
 * page is static HTML rendered by Astro — this component is the one place
 * that genuinely needs client-side state (open/closed) and lifecycle
 * (Escape-to-close, returning focus), so it's the one place that ships JS.
 */
export default function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center text-ink"
      >
        <span className="sr-only">Open menu</span>
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M2 6h18M2 11h18M2 16h18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 flex flex-col bg-paper"
        >
          <div className="flex items-center justify-end px-6 py-4">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setOpen(false);
                openButtonRef.current?.focus();
              }}
              className="flex h-10 w-10 items-center justify-center text-ink"
            >
              <span className="sr-only">Close menu</span>
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav aria-label="Primary" className="px-8 py-6">
            <ul className="flex flex-col gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
