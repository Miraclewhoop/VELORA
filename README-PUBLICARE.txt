VELORA PRODUCTION — WEBSITE V1
=============================

CONTINUT
- index.html: website-ul complet in limba romana
- confidentialitate.html: pagina privind prelucrarea datelor (DRAFT legal)
- styles.css, script.js, favicon.svg
- assets/: fotografii optimizate si logo transparent

CUM VEZI SITE-UL
Deschide index.html intr-un browser. Pentru o testare mai apropiata de un
website publicat, poti rula un server local din acest folder:
  python -m http.server 8080
si deschide http://localhost:8080

CUM PUBLICI
Acesta este un website static. Poti incarca toate fisierele, pastrand
structura folderelor, pe Netlify, Cloudflare Pages, Vercel (static)
sau un hosting clasic cu HTTPS. Pentru domeniul personalizat, configureaza
DNS-ul la provider-ul de hosting ales. Nicio gazduire nu a fost efectuata.

FORMULARUL DE CONTACT — INTEGRARE REALA
Formularul transmite prin API-ul documentat FormSubmit (formsubmit.co/ajax)
spre office@veloraproduction.ro. Nu este o simulare; pentru functionare
completa trebuie:
1. Publica site-ul pe un domeniu cu HTTPS.
2. Trimite o solicitare de test prin formular.
3. Verifica inboxul office@veloraproduction.ro (si SPAM) pentru emailul
   de ACTIVARE de la FormSubmit. Deschide linkul de confirmare o singura data.
4. Trimite a doua cerere de test si verifica sosirea ei in inbox.
5. Verifica, la lansare, fluxul end-to-end. Codul formului este pregatit,
   dar NU a fost testata live primirea emailurilor (necesita acces la inbox).

FormSubmit este un serviciu extern si poate aplica limitari anti-spam.
Documentatie: https://formsubmit.co/documentation
Formularul include: validare HTML+JS, honeypot, feedback real dupa raspunsul
serverului, GDPR notice. Trimiterea necesita internet si serviciul activ.

OBLIGATORIU INAINTE DE LANSARE
- Completeaza datele legale reale ale operatorului (denumire juridica,
  sediu, alte date cerute legal) si perioada/criteriile de pastrare in
  confidentialitate.html; revizuieste politica cu persoana responsabila.
- Verifica acordul privind utilizarea fotografiilor si logo-urilor.
- Confirma ca toate descrierile proiectelor, cifrele si partenerii sunt corecte.
- Activeaza FormSubmit si testeaza trimiterea.
- Pentru SEO, seteaza adresa completa a site-ului in og:image si adauga
  un sitemap dupa stabilirea domeniului.

EDITARE
Fonturile sunt incarcate din Google Fonts (DM Sans, Manrope, Playfair Display),
cu fallback local. Formularul poate fi inlocuit cu backend propriu in
script.js si atributul action din index.html. Fara dependinte JS externe.

SURSE MEDIA
Fotografii, logo, materiale de eveniment: furnizate de Velora in acest chat.
Nu am introdus fotografii stock care ar putea fi confundate cu proiecte reale.
