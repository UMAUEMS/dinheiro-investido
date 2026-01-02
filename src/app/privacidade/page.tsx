import { Metadata } from "next";
import Link from "next/link";
import { generateMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = generateMetadata({
  title: "Política de Privacidade",
  description:
    "Conheça nossa Política de Privacidade e saiba como o Dinheiro Investido coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidade
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
              O {siteConfig.name} está comprometido com a proteção da sua
              privacidade. Esta Política explica como coletamos, usamos e
              protegemos seus dados pessoais em conformidade com a Lei Geral de
              Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              1. Dados que Coletamos
            </h2>
            <p className="text-[#736F89] mb-4">
              Coletamos diferentes tipos de dados para fornecer e melhorar
              nossos serviços:
            </p>

            <h3 className="text-xl font-bold text-[#171A3D] mt-8 mb-3">
              1.1 Dados fornecidos por você
            </h3>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Dados de cadastro:</strong> nome, email, senha (criptografada)
              </li>
              <li>
                <strong>Dados de perfil:</strong> foto, empresa, cargo (opcionais)
              </li>
              <li>
                <strong>Dados de pagamento:</strong> processados por gateways seguros, não armazenamos dados de cartão
              </li>
              <li>
                <strong>Conteúdo:</strong> publicações, arquivos e materiais que você cria
              </li>
            </ul>

            <h3 className="text-xl font-bold text-[#171A3D] mt-8 mb-3">
              1.2 Dados coletados automaticamente
            </h3>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Dados de uso:</strong> páginas visitadas, funcionalidades utilizadas, tempo de uso
              </li>
              <li>
                <strong>Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo, sistema operacional
              </li>
              <li>
                <strong>Cookies:</strong> para funcionamento, análise e personalização
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              2. Como Usamos seus Dados
            </h2>
            <p className="text-[#736F89] mb-4">
              Utilizamos seus dados para as seguintes finalidades:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Processar pagamentos e gerenciar assinaturas</li>
              <li>Enviar comunicações sobre sua conta e serviços</li>
              <li>Personalizar sua experiência na plataforma</li>
              <li>Analisar uso e melhorar funcionalidades</li>
              <li>Prevenir fraudes e garantir segurança</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              3. Base Legal para Tratamento (LGPD)
            </h2>
            <p className="text-[#736F89] mb-4">
              Tratamos seus dados com base nas seguintes hipóteses legais da LGPD:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Execução de contrato:</strong> para fornecer os serviços contratados
              </li>
              <li>
                <strong>Consentimento:</strong> para comunicações de marketing (você pode revogar a qualquer momento)
              </li>
              <li>
                <strong>Legítimo interesse:</strong> para melhorar nossos serviços e prevenir fraudes
              </li>
              <li>
                <strong>Cumprimento de obrigação legal:</strong> para atender exigências fiscais e regulatórias
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              4. Compartilhamento de Dados
            </h2>
            <p className="text-[#736F89] mb-4">
              Não vendemos seus dados pessoais. Compartilhamos dados apenas nas
              seguintes situações:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Prestadores de serviço:</strong> empresas que nos ajudam a operar (hospedagem, pagamentos, email)
              </li>
              <li>
                <strong>Obrigações legais:</strong> quando exigido por lei ou ordem judicial
              </li>
              <li>
                <strong>Proteção de direitos:</strong> para investigar violações dos Termos de Uso
              </li>
              <li>
                <strong>Com seu consentimento:</strong> em outras situações, com sua autorização prévia
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              5. Seus Direitos (LGPD)
            </h2>
            <p className="text-[#736F89] mb-4">
              A LGPD garante a você os seguintes direitos sobre seus dados:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los
              </li>
              <li>
                <strong>Correção:</strong> corrigir dados incompletos ou desatualizados
              </li>
              <li>
                <strong>Anonimização ou eliminação:</strong> solicitar remoção de dados desnecessários
              </li>
              <li>
                <strong>Portabilidade:</strong> receber seus dados em formato estruturado
              </li>
              <li>
                <strong>Revogação do consentimento:</strong> retirar consentimento a qualquer momento
              </li>
              <li>
                <strong>Oposição:</strong> opor-se a tratamentos baseados em legítimo interesse
              </li>
            </ul>
            <p className="text-[#736F89] mb-4">
              Para exercer seus direitos, entre em contato pelo email:{" "}
              <a
                href="mailto:privacidade@dinheiroinvestidoweb.com.br"
                className="text-[#263A68] hover:underline"
              >
                privacidade@dinheiroinvestidoweb.com.br
              </a>
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              6. Segurança dos Dados
            </h2>
            <p className="text-[#736F89] mb-4">
              Implementamos medidas técnicas e organizacionais para proteger
              seus dados:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
              <li>Criptografia de senhas com algoritmos seguros</li>
              <li>Controle de acesso baseado em funções</li>
              <li>Monitoramento e logs de segurança</li>
              <li>Backups regulares e plano de recuperação</li>
              <li>Treinamento de equipe em proteção de dados</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              7. Cookies
            </h2>
            <p className="text-[#736F89] mb-4">
              Utilizamos cookies e tecnologias similares para:
            </p>
            <ul className="list-disc pl-6 text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Cookies essenciais:</strong> necessários para funcionamento básico
              </li>
              <li>
                <strong>Cookies de análise:</strong> para entender como você usa a plataforma
              </li>
              <li>
                <strong>Cookies de preferência:</strong> para lembrar suas configurações
              </li>
            </ul>
            <p className="text-[#736F89] mb-4">
              Você pode gerenciar cookies nas configurações do seu navegador.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              8. Retenção de Dados
            </h2>
            <p className="text-[#736F89] mb-4">
              Mantemos seus dados enquanto sua conta estiver ativa ou conforme
              necessário para fornecer serviços. Após encerramento da conta,
              mantemos dados por até 5 anos para cumprimento de obrigações
              legais, depois são eliminados ou anonimizados.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              9. Transferência Internacional
            </h2>
            <p className="text-[#736F89] mb-4">
              Alguns de nossos prestadores de serviço podem estar localizados
              fora do Brasil. Nesses casos, garantimos que a transferência
              ocorra com proteções adequadas, conforme exigido pela LGPD.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              10. Menores de Idade
            </h2>
            <p className="text-[#736F89] mb-4">
              Nossos serviços são destinados a maiores de 18 anos. Menores podem
              usar a plataforma apenas com supervisão e consentimento de
              responsável legal. Não coletamos intencionalmente dados de menores
              de 13 anos.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              11. Alterações nesta Política
            </h2>
            <p className="text-[#736F89] mb-4">
              Podemos atualizar esta Política periodicamente. Notificaremos
              sobre mudanças significativas por email ou através da plataforma.
              Recomendamos revisar esta página regularmente.
            </p>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              12. Encarregado de Dados (DPO)
            </h2>
            <p className="text-[#736F89] mb-4">
              Para questões relacionadas à proteção de dados, entre em contato
              com nosso Encarregado de Dados:
            </p>
            <ul className="list-none text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Email:</strong> dpo@dinheiroinvestidoweb.com.br
              </li>
              <li>
                <strong>Endereço:</strong> São Paulo, SP - Brasil
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#171A3D] mt-12 mb-4">
              13. Contato
            </h2>
            <p className="text-[#736F89] mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade:
            </p>
            <ul className="list-none text-[#736F89] mb-4 space-y-2">
              <li>
                <strong>Email:</strong> privacidade@dinheiroinvestidoweb.com.br
              </li>
              <li>
                <strong>Central de Ajuda:</strong>{" "}
                <Link href="/ajuda" className="text-[#263A68] hover:underline">
                  dinheiroinvestidoweb.com.br/ajuda
                </Link>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-[#E5E5E6] rounded-xl">
              <p className="text-[#736F89] mb-0">
                Ao usar o {siteConfig.name}, você confirma que leu e concorda
                com esta Política de Privacidade e nossos{" "}
                <Link
                  href="/termos"
                  className="text-[#263A68] hover:underline"
                >
                  Termos de Uso
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
