import { useState } from "react";

export interface Artwork {
  id: number;
  src: string;
  alt: string;
  title: string;
  year: string;
  description: string;
  medium: string;
}

type GridSize = "S" | "M" | "L";

const columnClasses: Record<GridSize, string> = {
  S: "columns-3 sm:columns-4 md:columns-5 lg:columns-6 xl:columns-7 gap-2 [&>*]:mb-2",
  M: "columns-2 sm:columns-3 md:columns-4 gap-3 [&>*]:mb-3",
  L: "columns-1 sm:columns-2 md:columns-3 gap-4 [&>*]:mb-4",
};

interface ArtProps {
  artworks: Artwork[];
}

function Art({ artworks }: ArtProps) {
  const [size, setSize] = useState<GridSize>("M");

  return (
    <section id="art" className="scroll-mt-0">
      <div className="sticky top-0 z-40 flex items-center justify-center gap-8 bg-[#EC573F] py-3 tracking-[0.35em] text-white">
        {(["S", "M", "L"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSize(option)}
            aria-pressed={size === option}
            aria-label={`${option === "S" ? "Small" : option === "M" ? "Medium" : "Large"} grid`}
            className={`text-lg font-medium transition-opacity hover:opacity-100 ${
              size === option
                ? "underline underline-offset-8 decoration-2 opacity-100"
                : "opacity-60"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className={`bg-[#ec573f] px-3 py-4 sm:px-5 sm:py-6 ${columnClasses[size]}`}>
        {artworks.map((art) => (
          <figure key={art.id} className="break-inside-avoid">
            <img
              src={art.src}
              alt={art.alt}
              title={`${art.title}${art.year ? ` (${art.year})` : ""}`}
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Art;
