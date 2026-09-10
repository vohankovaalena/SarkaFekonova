# Web Šárka Fekoňová

Statický web postavený podle dokumentu **struktura webu** a **brand manuálu**
(Kreativní studio Black Mango) ze složky [`specification/`](specification/).

## Spuštění

Web potřebuje běžet přes HTTP server, ne přes dvojklik na soubor. Siluety
tančících postav se vykreslují přes CSS masku a prohlížeče masky ze `file://`
z bezpečnostních důvodů neuvidí.

```bash
cd /Users/alenavohankova/sources/SarkaFekonova
python3 -m http.server 8000
# otevřete http://localhost:8000
```

Nasazení je pak jen nahrání celé složky na jakýkoli hosting statických stránek.
Není potřeba žádný build krok.

## Struktura

| Soubor | Stránka |
| --- | --- |
| `index.html` | Domů — hero, tři dlaždice, příběh, video, CTA |
| `ja-sarka.html` | Já, Šárka… — kdo jsem, co mi dal tanec, můj přístup, rozbalovací delší příběh |
| `pro-firmy.html` | Pro firmy — programy, průběh spolupráce, poptávka |
| `pro-zeny.html` | Pro ženy — workshopy, ladies nights, pobyty, rozlučky |
| `pro-deti.html` | Pro děti — MŠ, Trenéři ve škole, vystoupení, oslavy |
| `byznysove-konzultace.html` | Oddělená služba, odkaz jen z patičky a ze stránky Pro firmy |
| `kontakt.html` | Formulář, kontakty, sociální sítě |
| `assets/css/style.css` | Celý design systém |
| `assets/js/main.js` | Menu, formuláře, video, validace |

## Co ještě doplnit

Na těchto místech jsou zástupné hodnoty:

1. **E-mail a telefon** — `info@sarkafekonova.cz` a `+420 000 000 000`.
   Hledejte v patičce každé stránky, na `kontakt.html` a v `assets/js/main.js`
   (konstanta `SITE.email`).
2. **Odkazy na sociální sítě** — v patičce a na `kontakt.html` vedou zatím na
   úvodní stránky Instagramu, Facebooku a LinkedInu.
3. **Video na úvodní stránce** — v `index.html` je `data-video="VIDEO_ID"`.
   Nahraďte ID videa z YouTube, přehrávač se načte až po kliknutí (bez cookies,
   přes `youtube-nocookie.com`).
4. **Odesílání formulářů** — v `assets/js/main.js` vyplňte `SITE.formEndpoint`
   (např. Formspree). Dokud je prázdný, formulář po odeslání otevře
   předvyplněný e-mail, takže funguje i bez backendu.
5. **Fotografie** — v `assets/img/` jsou zatím snímky z moodboardu brand
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
> proporce. Až licenci koupíte, stačí přepsat `--font-head` v `style.css` a
> přidat `@font-face`.

**Grafické prvky.** Zaoblený hexagon (poloměr 20) slouží jako odznak pro jedno
sdělení. Siluety tančících postav v `assets/sil/` jsou bílé masky, takže se
obarvují přes `color` podle sekce — třídy `.sil--zena-1`, `.sil--deti`,
`.sil--dav` a podobně.

**Tón.** Vykáme s úsměvem, píšeme jako člověk, ne jako firma. Do textů jsou
zapracované značkové fráze z manuálu (*Tanec má přesah*, *Vše na míru*,
*S úsměvem vpřed*).

## Přístupnost

Skip link, viditelný focus, `aria-current` na aktivní položce menu, popisky
u všech polí formuláře, chybové hlášky přes `role="alert"`, respektování
`prefers-reduced-motion` a alternativní texty u fotografií.
