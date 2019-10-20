# Önskelista demo

Det här en utgångspunkt för en bröllopsönskelista.

## Steg att följa

Följ de här stegen när önskelistan ska användas för en eller flera nya önskare.

### Visual Studio Code

- Öppna mappen onskelista i Visual Studio Code
- Gå till branch master:

```
git checkout master
```

- Skapa en ny branch med namnet förnamnförnamn och gå till branchen:

```
git checkout -b förnamnförnamn
```

### Firebase

- Gå in i Console i Firebase: https://console.firebase.google.com/u/0/
- Klicka på Add project
- Ge projektet namnet onskelista-förnamnförnamn
- Klicka på Continue
- Stäng av Google Analytics och klicka på Create project
- Klicka på Continue

#### Användare

- Gå till Authentication
- Klicka på Set up sign-in method
- Klicka på Email/Password
- Klicka Enable på den övre radio-knappen och klicka på Save
- Gå till Users
- Klicka på Add user
- Skriv "admin@wishlist.com" i Email och lösenord enligt önskemål i Password
- Gör samma sak igen med "guest@wishlist.com" i Email och lösenord enligt önskemål i Password

#### Databas

- Gå till Database
- Klicka på Create database
- Välj Start in locked mode och klicka på Next
- Välj "eur3 (europe-west) som Cloud Firestore location
- Klicka på Done
- Klicka på Start collection och ge den namnet "wishes"
- Klicka på Next
- Klicka på "Auto-ID" och sedan Save
- Gå till Rules
- Ta bort allt och klistra in följande:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

- Klicka på Publish

#### API

- Gå till Project Overview
- Klicka på </>
- Ge appen namnet onskelista-förnamnförnamn
- Klicka inte i "Also set up Firebase Hosting for this app"
- Klicka på Register app
- Kopiera allt som finns inuti firebaseConfig-variablen

### Visual Studio Code

- Gå till src/components/firebaseConfig.js
- Klistra in innehållet i firebaseConfig i firebaseConfig-objektet
- Gå till src/store.js
- Ändra adminPassword & guestPassword beroende på lösenorden som angavs i Firebase Authentication
- Ändra adminWisher beroende på önskarens/önskarnas namn (exempelvis John & Jane)
- Gå till src/assets/\_settings.scss
- Ändra \$primary-color och beroende på önskarens/önskarnas önskemål
- Pusha ändringarna:

```
git add .
git commit -m "förnamnförnamn settings"
git push --set-upstream origin förnamnförnamn
```

### Netlify

- Gå in på Netlify: https://app.netlify.com/teams/filiptammergard/sites
- Klicka på New site from Git
- Under Continuous Deployment, klicka på GitHub
- Logga in om det behövs
- Klicka på filiptammergard/onskelista
- På "Branch på deploy", välj förnamnförnamn
- På "Build command", skriv "npm run build"
- På "Publish directory", skriv "dist"
- Klicka på Deploy site
- Klicka på Domain settings
- Längst till höger vid "Default subdomain", klicka på de tre prickarna och sedan på Edit site name
- Ändra Site name till förnamnförnamn eller enligt önskarens/önskarnas önskemål
- Klicka på Save

Klart!
