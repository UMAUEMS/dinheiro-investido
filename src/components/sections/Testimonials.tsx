import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      className="py-20 lg:py-32 bg-white"
      aria-labelledby="testimonials-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#4F3D67] font-semibold mb-4">
            DEPOIMENTOS
          </span>
          <h2
            id="testimonials-title"
            className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-6"
          >
            O que nossos usuários dizem
          </h2>
          <p className="text-lg text-[#736F89]">
            Milhares de pessoas já transformaram suas ideias em publicações incríveis.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-[#E5E5E6] to-white rounded-2xl p-8"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-[#171A3D] mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center">
                  <span className="text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-[#171A3D]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[#736F89]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
