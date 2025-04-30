# Ohjelmistoprojektin vaatimusmäärittely

## Ryhmä 7

### Sovelluksen ominaisuuksia

- Toimiva tietokilpailu, jossa on yhteensä 10 kysymystä. Kategorioiden kysymykset tulevat REST API:sta, joista sattumanvaraisesti valitaan 10 kysymystä.
- Aloitussivulla on sovelluksen logo, tekstiä ja neljä painiketta, joista voidaan valita tietovisailun kategoria. Painike vaihtaa väriä, kun vie hiiren sen ylle.
- Pelisivulla on logo, ajastin, kysymysnumero, kysymyslaatikko sekä neljä vastausvaihtoehtopainiketta. Painike vaihtaa väriä, kun vie hiiren sen ylle. Oikeasta vastauksesta painike muuttuu vihreäksi ja tulee äänimerkki, väärästä vastauksesta punaiseksi ja tulee äänimerkki.
- Pisteytys toimii siten, että koko pelistä voi saada enintään 1000 pistettä. Yhteen kysymykseen on 15 sekuntia aikaa vastata. Joka sekunti vähenee 15 pistettä, väärästä vastauksesta, tai jos aika loppuu, saa 0 pistettä. Lopuksi pisteet lasketaan yhteen ja käyttäjälle kerrotaan tulos.
- Lopetussivulla on logo, vaihtuva teksti riippuen pistemäärästä, pistemäärä, teksti uudesta pelistä ja painikkeet uudelle pelille sekä kategorian vaihdolle.
- Sivuilla olevasta logosta painamalla voidaan palata aloitussivulle.
