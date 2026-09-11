# Web Šárka Fekoňová

Statický web postavený podle dokumentu **struktura webu** a **brand manuálu**
(Kreativní studio Black Mango) ze složky [`specification/`](specification/).

## Spuštění

Web staví [Eleventy](https://www.11ty.dev/). Hlavička, patička a hlavička
dokumentu žijí v jediné šabloně, takže se neupravují na sedmi místech.

```bash
npm install      # jednou po naklonování
npm start        # vývojový server na http://localhost:8080
npm run build    # vygeneruje _site/
```

## Nasazení

Web nasazuje GitHub Actions na GitHub Pages. Po každém pushi do větve `main`
se spustí [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
který web postaví a publikuje. Ručně se nikam nic nenahrává a složka `_site/`
se do gitu necommituje.

Jednorázově je potřeba v repozitáři na GitHubu otevřít
**Settings → Pages** a v poli **Source** zvolit **GitHub Actions**.
Bez toho nemá workflow kam publikovat.

Všechny cesty v HTML i v CSS jsou relativní, takže web funguje jak na adrese
`https://vohankovaalena.github.io/SarkaFekonova/`, tak později na vlastní
doméně. Ta se nastavuje rovněž v **Settings → Pages**.

## Struktura

| Soubor | Co obsahuje |
| --- | --- |
| `src/_includes/base.njk` | Jediná šablona: `<head>`, hlavička, menu, patička |
| `src/_data/nav.json` | Položky hlavního menu na jednom místě |
| `src/src.11tydata.js` | Společné nastavení stránek a tvar adres `*.html` |
| `src/index.njk` | Domů — hero, čtyři hexagony, příběh, video, výzva |
| `src/ja-sarka.njk` | Já, Šárka… — kdo jsem, co mi dal tanec, můj přístup |
| `src/pro-firmy.njk` | Pro firmy — programy, průběh spolupráce, poptávka |
| `src/pro-zeny.njk` | Pro ženy — workshopy, ladies nights, pobyty, rozlučky |
| `src/pro-deti.njk` | Pro děti — MŠ, Trenéři ve škole, vystoupení, oslavy |
| `src/byznysove-konzultace.njk` | Oddělená služba, odkaz z patičky a ze stránky Pro firmy |
| `src/kontakt.njk` | Formulář, kontakty, sociální sítě |
| `src/assets/css/style.css` | Celý design systém |
| `src/assets/js/main.js` | Menu, formuláře, video, validace |

Stránka obsahuje jen svůj vlastní obsah a čtyři proměnné v záhlaví souboru:

```yaml
---
title: "Pohybové programy pro firmy — Šárka Fekoňová"
description: "Teambuildingy, firemní akce a pohyb jako benefit."
theme: "firmy"     # nepovinné: zeny, deti, firmy
ogTitle: "…"       # nepovinné, jinak se použije title
---
```

Aktivní položku menu si Eleventy dopočítá z adresy stránky, `aria-current`
se tedy nikde neudržuje ručně.

## Co ještě doplnit

Na těchto místech jsou zástupné hodnoty:

1. **E-mail a telefon** — `info@sarkafekonova.cz` a `+420 000 000 000`.
   Patička je v `src/_includes/base.njk`, kontaktní stránka v
   `src/kontakt.njk` a konstanta `SITE.email` v `src/assets/js/main.js`.
2. **Odkazy na sociální sítě** — v patičce a v `src/kontakt.njk` vedou zatím na
   úvodní stránky Instagramu, Facebooku a LinkedInu.
3. **Video na úvodní stránce** — v `src/index.njk` je `data-video="VIDEO_ID"`.
   Nahraďte ID videa z YouTube, přehrávač se načte až po kliknutí (bez cookies,
   přes `youtube-nocookie.com`).
4. **Odesílání formulářů** — v `src/assets/js/main.js` vyplňte `SITE.formEndpoint`
   (např. Formspree). Dokud je prázdný, formulář po odeslání otevře
   předvyplněný e-mail, takže funguje i bez backendu.
5. **Fotografie** — v `src/assets/img/` jsou zatím snímky z moodboardu brand
   manuálu (strana „Doporučené fotografie“). Před spuštěním je nahraďte
   vlastními fotkami Šárky a jejích lekcí a zkontrolujte licence.
   Portrét `sarka-hero.png` / `.webp` je vyříznutý z titulní strany manuálu.

## Design systém

Vše vychází z brand manuálu.

**Barvy.** Krémová `#f7f3e3` je základ všech stránek. Každá cílovka má vlastní
paletu, přepíná se atributem `data-theme` na `<body>`:

| `data-theme` | Dominantní | Akcent | Použito na |
| --- | --- | --- | --- |
| *(žádné)* | švestková `#6b0143` | pudrová růžová `#ffa9c8` | Domů, Já Šárka, Kontakt |
| `zeny` | švestková `#6b0143` | pudrová růžová `#ffa9c8` | Pro ženy |
| `deti` | švestková `#6b0143` | žlutozelená `#e4faa1` | Pro děti |
| `firmy` | indigo `#3912b0` | vínová `#6b0143` | Pro firmy, Byznysové konzultace |

Gradient přes barvy všech tří sekcí (žlutozelená → růžová → indigo) nese hero
stránky „Já, Šárka…“, přesně podle kapitoly *Šárky příběh*.

**Typografie.** Nadpisy vznikají spojením prvního velkého písmena fontem
**Allura** a zbytku textem geometrickým groteskem — v CSS to řeší pravidlo
`h1::first-letter`. Tělo textu je **Inter**.

> Manuál předepisuje pro nadpisy **Codec Pro Regular**. Ten je placený, proto je
> tu nahrazený fontem **Outfit** z Google Fonts, který má velmi blízké
> proporce. Až licenci koupíte, stačí přepsat `--font-head` v `src/assets/css/style.css` a
> přidat `@font-face`.

**Grafické prvky.** Zaoblený hexagon (poloměr 20) slouží jako odznak pro jedno
sdělení. Siluety tančících postav v `src/assets/sil/` jsou bílé masky, takže se
obarvují přes `color` podle sekce — třídy `.sil--zena-1`, `.sil--deti`,
`.sil--dav` a podobně.

**Tón.** Vykáme s úsměvem, píšeme jako člověk, ne jako firma. Do textů jsou
zapracované značkové fráze z manuálu (*Tanec má přesah*, *Vše na míru*,
*S úsměvem vpřed*).

## Přístupnost

Skip link, viditelný focus, `aria-current` na aktivní položce menu, popisky
u všech polí formuláře, chybové hlášky přes `role="alert"`, respektování
`prefers-reduced-motion` a alternativní texty u fotografií.
