/**
 * Platform Demo Video Section
 * Showcases SAI Platform in action with YouTube embed
 */
export function PlatformDemoSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            See SAI Platform in Action
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            Watch how one platform replaces 5+ tools and streamlines your entire workflow—from first contact to closing.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/psE2sshwsVM?rel=0&modestbranding=1"
                title="SAI Platform Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
