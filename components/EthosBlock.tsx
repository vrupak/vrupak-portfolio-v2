import { ethosBlocks } from "@/data/content";

export default function EthosBlocks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-20">
        {ethosBlocks.map((block) => (
          <div key={block.id} className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              {block.headline}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
              {block.description}
            </p>
            <a
              href={block.ctaHref}
              className="inline-block text-lg font-semibold underline hover:no-underline"
            >
              {block.ctaText} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
