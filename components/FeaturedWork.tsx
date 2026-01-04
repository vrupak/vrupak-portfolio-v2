import { featuredProjects } from "@/data/content";

export default function FeaturedWork() {
  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <div key={project.id} className="border-b border-gray-300 pb-4">
              <p className="text-sm text-gray-500 mb-2">{project.type}</p>
              <h3 className="text-2xl font-bold">{project.title}</h3>
            </div>
          ))}
        </div>
        <a
          href="#work"
          className="text-lg font-semibold underline hover:no-underline"
        >
          All Work →
        </a>
      </div>
    </section>
  );
}
