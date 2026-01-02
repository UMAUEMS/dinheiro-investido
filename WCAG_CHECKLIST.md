# Checklist de Acessibilidade (WCAG) - Base

Este documento resume as verificações básicas de acessibilidade (WCAG 2.1 Nível AA) realizadas na Parte 1 do projeto.

## Princípio 1: Perceptível

| Critério | Status | Observações |
| :--- | :--- | :--- |
| **1.1.1 Conteúdo Não Textual** | ✅ Passou | Todas as imagens de conteúdo têm `alt` text. Ícones são decorativos ou têm `aria-label`. |
| **1.3.1 Informações e Relações** | ✅ Passou | Uso correto de `<h1>`-`<h6>`, `<nav>`, `<main>`, `<header>`, `<footer>`. Listas e tabelas estruturadas. |
| **1.3.2 Sequência Significativa** | ✅ Passou | A ordem do conteúdo é lógica e preservada sem CSS. |
| **1.4.1 Uso de Cores** | ✅ Passou | A informação não é transmitida apenas por cor. Links são sublinhados ou têm outro indicador visual. |
| **1.4.3 Contraste (Mínimo)** | ✅ Passou | Contraste de texto verificado. A paleta (#171A3D, #E5E5E6) oferece bom contraste. |
| **1.4.4 Redimensionamento de Texto** | ✅ Passou | O layout se adapta ao zoom de até 200% sem perda de conteúdo ou funcionalidade. |
| **1.4.5 Imagens de Texto** | ✅ Passou | O texto é usado para transmitir informação, não imagens de texto. |

## Princípio 2: Operável

| Critério | Status | Observações |
| :--- | :--- | :--- |
| **2.1.1 Acessível por Teclado** | ✅ Passou | Todos os elementos interativos (links, botões, inputs) são acessíveis e operáveis via teclado. |
| **2.1.2 Sem Armadilhas de Teclado** | ✅ Passou | O foco do teclado não fica preso em nenhum componente. |
| **2.4.1 Pular Blocos** | ✅ Passou | Link "Pular para o conteúdo principal" implementado no início de cada página. |
| **2.4.3 Ordem do Foco** | ✅ Passou | A ordem de navegação com a tecla Tab é lógica e intuitiva. |
| **2.4.4 Propósito do Link (no contexto)** | ✅ Passou | O propósito de cada link é claro pelo seu texto ou contexto (ex: "Ler mais"). |
| **2.4.7 Foco Visível** | ✅ Passou | O foco do teclado é sempre visível, usando o anel de foco padrão do navegador ou customizado. |

## Princípio 3: Compreensível

| Critério | Status | Observações |
| :--- | :--- | :--- |
| **3.1.1 Idioma da Página** | ✅ Passou | O atributo `lang="pt-BR"` está definido no `<html>`. |
| **3.2.2 Ao Receber Foco** | ✅ Passou | Nenhum componente dispara uma mudança de contexto ao receber foco. |
| **3.3.1 Identificação de Erros** | ⚠️ Parcial | Implementado na página de autenticação (stub). Será expandido com formulários reais. |
| **3.3.2 Rótulos ou Instruções** | ✅ Passou | Formulários (newsletter, auth) têm rótulos (`<label>`) associados aos seus campos. |

## Princípio 4: Robusto

| Critério | Status | Observações |
| :--- | :--- | :--- |
| **4.1.1 Análise (Parsing)** | ✅ Passou | O código HTML é bem formado, sem erros de aninhamento ou IDs duplicados. |
| **4.1.2 Nome, Função, Valor** | ✅ Passou | Uso de `role` e `aria-label` onde necessário para expor o propósito dos componentes a tecnologias assistivas. |

**Conclusão**: A base do site atende aos principais critérios de acessibilidade do WCAG 2.1 AA, garantindo uma experiência inclusiva para a maioria dos usuários. Melhorias contínuas serão feitas nas próximas fases do projeto.
