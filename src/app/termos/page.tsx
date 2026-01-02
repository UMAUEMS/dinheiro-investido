import { Metadata } from "next";
import Link from "next/link";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = generateMetadata({
  title: "Termos de Uso",
  description:
    "Leia os Termos de Uso do Dinheiro Investido. Conheça as regras e condições para utilizar nossa plataforma.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Termos de Uso
            </h1>
            <p className="text-xl text-white/80">
              Última atualização: 02 de Janeiro de 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto prose prose-lg prose-slate">
            <p className="lead text-[#736F89] text-xl">
              Bem-vindo ao {siteConfig.name}. Ao acessar e usar nossa plataforma,
              você concorda com estes Termos de Uso. Leia-os com atenção.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-[#736F89] mb-4">
              Ao criar uma conta ou utilizar qualquer serviço do {siteConfig.name},
              você declara que leu, entendeu e concorda em ficar vinculado a
              estes Termos de Uso e à nossa Política de Privacidade.
            </p>
            <p className="text-[#736F89] mb-4">
              Se você não concordar com qualquer parte destes termos, não
              utilize nossa plataforma.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              2. Descrição do Serviço
            </h2>
            <p className="text-[#736F89] mb-4">
              O {siteConfig.name} é uma plataforma de criação e publicação de
              conteúdo digital interativo, incluindo flipbooks, revistas
              digitais, catálogos, convites virtuais e packs digitais.
            </p>
            <p className="text-[#736F89] mb-4">
              Nossos serviços incluem, mas não se limitam a:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>Conversão de PDFs em publicações interativas</li>
              <li>Editor visual para criação de conteúdo</li>
              <li>Hospedagem e compartilhamento de publicações</li>
              <li>Ferramentas de venda e monetização</li>
              <li>Geração de vídeos interativos com IA</li>
              <li>Analytics e métricas de engajamento</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              3. Cadastro e Conta
            </h2>
            <p className="text-[#736F89] mb-4">
              Para utilizar nossos serviços, você deve criar uma conta
              fornecendo informações verdadeiras e completas. Você é responsável
              por manter a confidencialidade de sua senha e por todas as
              atividades realizadas em sua conta.
            </p>
            <p className="text-[#736F89] mb-4">
              Você deve ter pelo menos 18 anos ou a idade legal de maioridade em
              sua jurisdição para criar uma conta. Menores de idade podem usar a
              plataforma sob supervisão de um responsável legal.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              4. Uso Aceitável
            </h2>
            <p className="text-[#736F89] mb-4">
              Você concorda em usar o {siteConfig.name} apenas para fins legais e
              de acordo com estes Termos. É proibido:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>Publicar conteúdo ilegal, difamatório ou ofensivo</li>
              <li>Violar direitos autorais ou propriedade intelectual</li>
              <li>Distribuir malware ou código malicioso</li>
              <li>Tentar acessar contas de outros usuários</li>
              <li>Usar a plataforma para spam ou phishing</li>
              <li>Revender acesso à plataforma sem autorização</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              5. Propriedade Intelectual
            </h2>
            <p className="text-[#736F89] mb-4">
              Você mantém todos os direitos sobre o conteúdo que cria e publica
              na plataforma. Ao publicar, você nos concede uma licença limitada
              para hospedar, exibir e distribuir seu conteúdo conforme
              necessário para operar o serviço.
            </p>
            <p className="text-[#736F89] mb-4">
              O {siteConfig.name}, incluindo sua marca, design, código e
              funcionalidades, é propriedade exclusiva nossa e está protegido
              por leis de propriedade intelectual.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              6. Planos e Pagamentos
            </h2>
            <p className="text-[#736F89] mb-4">
              Oferecemos planos gratuitos e pagos. Os planos pagos são cobrados
              de forma recorrente (mensal ou anual) e renovados automaticamente
              até o cancelamento.
            </p>
            <p className="text-[#736F89] mb-4">
              Você pode cancelar sua assinatura a qualquer momento. O acesso aos
              recursos pagos continuará até o final do período já pago. Não
              oferecemos reembolsos proporcionais.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              7. Vendas e Marketplace
            </h2>
            <p className="text-[#736F89] mb-4">
              Se você utilizar nossos recursos de venda, você é responsável por
              cumprir todas as leis aplicáveis, incluindo tributação e direitos
              do consumidor. Cobramos uma comissão sobre vendas realizadas na
              plataforma, conforme especificado em seu plano.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              8. Limitação de Responsabilidade
            </h2>
            <p className="text-[#736F89] mb-4">
              O {siteConfig.name} é fornecido "como está". Não garantimos que o
              serviço será ininterrupto ou livre de erros. Em nenhuma
              circunstância seremos responsáveis por danos indiretos,
              incidentais ou consequentes.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              9. Modificações dos Termos
            </h2>
            <p className="text-[#736F89] mb-4">
              Podemos atualizar estes Termos periodicamente. Notificaremos sobre
              mudanças significativas por email ou através da plataforma. O uso
              continuado após as alterações constitui aceitação dos novos
              termos.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              10. Rescisão
            </h2>
            <p className="text-[#736F89] mb-4">
              Podemos suspender ou encerrar sua conta se você violar estes
              Termos. Você pode encerrar sua conta a qualquer momento através
              das configurações ou entrando em contato conosco.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              11. Lei Aplicável
            </h2>
            <p className="text-[#736F89] mb-4">
              Estes Termos são regidos pelas leis da República Federativa do
              Brasil. Qualquer disputa será resolvida nos tribunais da comarca
              de São Paulo, SP.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              12. Contato
            </h2>
            <p className="text-[#736F89] mb-4">
              Se você tiver dúvidas sobre estes Termos, entre em contato:
            </p>
            <ul className="list-none text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Email:</strong> legal@dinheiroinvestidoweb.com.br
              </li>
              <li>
                <strong>Endereço:</strong> São Paulo, SP - Brasil
              </li>
            </ul>

            <div className="mt-12 p-6 bg-[#E5E5E6] rounded-xl">
              <p className="text-[#736F89] mb-0">
                Ao usar o {siteConfig.name}, você confirma que leu e concorda
                com estes Termos de Uso e nossa{" "}
                <Link
                  href="/privacidade"
                  className="text-[#263A68] hover:underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
