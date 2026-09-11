/* Společné nastavení pro všechny stránky ve složce src/.
   Díky permalinku zůstávají adresy ve tvaru /pro-firmy.html, takže
   odkazy uvnitř webu nepotřebují žádnou úpravu. */
export default {
  layout: "base.njk",
  permalink: (data) => `${data.page.filePathStem}.html`
};
