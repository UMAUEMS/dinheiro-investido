import { Upload, MousePointer, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Envie seu arquivo",
    description:
      "Faça upload do seu PDF, Word ou PowerPoint, ou escolha um de nossos modelos prontos.",
  },
  {
    number: "02",
    icon: MousePointer,
    title: "Edite com facilidade",
    description:
      "Use nosso editor visual intuitivo. Clique, arraste e solte para personalizar tudo.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Publique e compartilhe",
    description:
      "Publique instantaneamente, compartilhe por link ou venda sua criação online.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-20 lg:py-32 bg-white"
      aria-labelledby="how-it-works-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#4F3D67] font-semibold mb-4">
            SIMPLES E RÁPIDO
          </span>
          <h2
            id="how-it-works-title"
            className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-6"
          >
            Como funciona
          </h2>
          <p className="text-lg text-[#736F89]">
            Crie publicações profissionais em apenas 3 passos simples, 
            sem precisar de conhecimento técnico.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#171A3D] to-[#263A68]" />
              )}

              <div className="relative bg-white rounded-2xl p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#171A3D] to-[#263A68] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E5E5E6] to-white flex items-center justify-center shadow-lg">
                  <step.icon className="w-10 h-10 text-[#171A3D]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#171A3D] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#736F89]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
