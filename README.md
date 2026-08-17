# uma leitura que eu provavelmente não deveria estar fazendo

Uma leitura de cartas feita de música, para Vitória: sete faixas, uma tela por
carta, e um texto que vai revelando a intenção aos poucos. Tem uma oitava carta
escondida atrás de um falso final.

Feito com Next.js (App Router), TypeScript, Tailwind, Framer Motion e o embed
oficial do Spotify. Sem backend, sem variáveis de ambiente, sem banco.

## Direção visual

Tarot moderno + céu noturno rosa + R&B + luz de velas. O preto do fundo
(`#090307`) existe só pra fazer o rosa acender.

| Papel | Cor |
| --- | --- |
| Fundo | `#090307` / `#140810` |
| Rosa principal | `#D94A8C` |
| Rosa claro / detalhes | `#F28BBC` · `#F7B6D2` |
| Vinho | `#711A46` · `#4A1632` |
| Lilás (carta da lua) | `#C69BF4` |
| Texto | `#FFF5F9` / `#D7A9BD` |

A luz do quarto esquenta ao longo da leitura: começa em rosa quase apagado na
carta I, vai subindo até a VII, quase apaga no falso final e chega no ponto
mais alto em *Get You*. O halo das capas acompanha o mesmo aquecimento — quem
controla essa curva é o `intensity` no [Experience.tsx](components/Experience.tsx).

Cada carta tem símbolo (`✦ ☾ ♡ ✧ ☽`) e numeral romano, cantoneiras de tarot
nas capas, e um céu de estrelas rosa/lilás com duas constelações quase
invisíveis. As posições das estrelas vêm de um gerador com semente fixa, então
servidor e cliente desenham exatamente o mesmo céu.

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:3000`.

Para gerar o build de produção:

```bash
npm run build
```

E para checar os tipos sem compilar:

```bash
npm run typecheck
```

## Deploy na Vercel

O projeto é um app Next.js padrão — a Vercel detecta tudo sozinha.

1. Suba o repositório para o GitHub (ou GitLab/Bitbucket).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Não mude nada: framework `Next.js`, build `npm run build`, output `.next`.
4. Deploy.

**Nenhuma variável de ambiente é necessária.**

Alternativa pelo terminal:

```bash
npx vercel
```

### Sobre as capas

As capas vêm do CDN público do Spotify e já estão liberadas em
`next.config.mjs` (`images.remotePatterns`). Cada capa tem uma URL de fallback
em 300px caso a versão de 640px falhe — o componente troca sozinho.

## Como a experiência funciona

| Etapa | O que acontece |
| --- | --- |
| Intro | Aura rosa, `✦`, o convite e o "para Vitória." |
| I → VII | Uma carta por música, com indicador `✦ I / VII` e barra de progresso |
| III | Libera só depois do `hmm…` (ou sozinho, se a pessoa demorar) |
| IV | A carta da lua: rosa + lilás, e a pergunta com duas respostas |
| V | O texto só aparece se a pessoa clicar em `por quê?` |
| VI | O rosa esquenta e a frase principal vem em degradê |
| VII | Numeral grande, tela mínima e a pergunta final |
| Falso final | "fim da leitura." → a luz baixa → "as cartas dizem que falta uma." |
| Carta escondida | *Get You*, sem contador, atrás de "revelar última carta ✦" |

O nome dela aparece três vezes, sempre nos momentos mais pessoais: na abertura,
na carta III e na pergunta final. Em nenhum outro lugar — é o que mantém o
efeito.

### Navegação

- **Botão** — o caminho principal, sempre visível quando o capítulo libera.
- **Teclado** — `→`, `↓` ou `Page Down`.
- **Scroll / swipe** — a roda do mouse e o swipe pra cima avançam quando a
  seção já chegou no fim; swipe pra esquerda avança direto.

Capítulos com interação obrigatória (03, 04, 05, 07) só liberam os atalhos
depois que a pessoa responde.

## Estrutura

```text
app/
  layout.tsx          metadata, fontes, favicon
  page.tsx            monta a experiência
  globals.css         tema, tipografia, grão de filme
components/
  Experience.tsx      máquina de estados da leitura + curva de luz
  Intro.tsx           tela inicial
  TrackSection.tsx    molde de uma carta (capa + texto, lados alternados)
  TrackNarrative.tsx  o ritmo de cada carta: quando cada frase chega
  FinalQuestion.tsx   carta VII, a pergunta
  FakeEnding.tsx      o final que não é o final + a carta virada
  EasterEgg.tsx       Get You, o encerramento de verdade
  SpotifyPlayer.tsx   embed + link externo
  Cover.tsx           capa com halo rosa e respiração
  ProgressIndicator.tsx  ✦ I / VII
  InteractiveQuestion.tsx
  BackgroundGradient.tsx  as auras rosa que passeiam devagar
  Starfield.tsx       céu de estrelas + constelações (semente fixa)
  TarotOrnaments.tsx  cantoneiras, lua em traço, divisória com símbolo
  PointerGlow.tsx     luz que segue o mouse (só desktop)
  ScrollHint.tsx      seta discreta quando a carta não cabe na tela
  Reveal.tsx          texto que chega em foco
  ui/Buttons.tsx
data/tracks.ts        TODO o texto e os dados das músicas moram aqui
types/track.ts
lib/storage.ts        localStorage
lib/color.ts
hooks/
```

Para mudar qualquer frase, mexa em `data/tracks.ts`. Os componentes não têm
texto de narrativa hardcoded.

## O que fica salvo no navegador

Chave `playlist-experience` no `localStorage`:

```ts
{
  telepatiaAnswer: "talvez" | "definitivamente" | null,
  finalAnswer: "quero" | "depende" | null,
  completedExperience: boolean
}
```

As respostas ficam gravadas, mas **a tela sempre começa limpa**. Isso é de
propósito: se ela voltar no site e encontrar a pergunta já respondida e
travada, a leitura perde a graça. O `localStorage` aqui é registro, não estado
de interface.

Atualizar a página recomeça do início, também de propósito — a experiência é
curta e vale mais inteira. Se o `localStorage` estiver bloqueado (aba anônima
do Safari, por exemplo), nada quebra: a leitura roda igual, só não registra.

## Acessibilidade

- HTML semântico, `aria-label` nos botões e nas seções, foco visível.
- Blocos de texto que aparecem em etapas usam `aria-live="polite"`.
- `prefers-reduced-motion` remove blur, deslocamento e os loops infinitos —
  o texto continua aparecendo, só sem o movimento.
- Nenhuma informação depende só de animação.

## Detalhes

O áudio nunca toca sozinho: o embed do Spotify respeita a política de autoplay
do navegador e a pessoa clica pra ouvir. Se o embed não carregar por qualquer
motivo, o link "Ouvir no Spotify" continua ali e o capítulo funciona igual.

Tem algumas coisas escondidas pelo site. Não vou dizer onde.
