"use client";

export const ScrollToTop = ({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) => {
  if (!show) return null;

  return (
    <button
      aria-label="Scroll to top"
      className="fixed bottom-6 cursor-pointer right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-(--ink) text-white shadow-lg transition hover:opacity-80"
      onClick={onClick}
      type="button"
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
