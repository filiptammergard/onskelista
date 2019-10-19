# Önskelista demo

Det här en utgångspunkt för en bröllopsönskelista.

## Steg att följa

Följ de här stegen när önskelistan ska användas för ett nytt brudpar.

### I Visual Studio Code

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
- Skapa projektet

#### Användare

- Gå till Authentication
- Klicka på Set up sign-in method
- Klicka Enable på den övre radio-knappen
- Klicka på Save
- Klicka på Users
- Klicka på Add user
- Skriv "admin@wishlist.com" i Email och lösenord enligt önskemål i Password
- Klicka på Add user
- Gör samma sak igen med "guest@wishlist.com" i Email och lösenord enligt önskemål i Password

#### Databas

- Gå till Database
- Klicka på Create database
- Klicka på Next
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
- Gå till Data
- Klicka på Start collection och ge den namnet "wishes"
- Lägg till

#### Firebase API

- Gå till Project Overview
- Klicka på </>
- Ge appen namnet onskelista-förnamnförnamn
- Kopiera allt som finns inuti firebaseConfig-variablen
- Klistra in i firebaseConfig.js

I filhanteraren:

- Skapa en ny mapp med namnet wishlist-förnamnförnamn i filip/Dev/Önskelistor
- Kopiera över

I GitHub:

- Skapa ett nytt repo och ge det namnet wishlist-förnamnförnamn
- Välj Private

I store.js:

- Ändra adminPassword & guestPassword beroende på lösenorden som angavs i Firebase
- Ändra man och woman beroende på brudparets namn

I \_settings.scss:

- Ändra $primary-color och $secondary-color beroende på brudparets önskemål

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
