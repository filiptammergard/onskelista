# Önskelista demo

## Steg att följa

### Firebase

- Gå in i Console i Firebase: https://console.firebase.google.com/u/0/
- Klicka på Add project
- Ge projektet namnet onskelista-förnamnförnamn
- Skapa projektet

- Gå till Database
- Klicka på Create database
-

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

- Skapa en collection med namnet "wishes" i Database-fliken
- Skapa användare "admin@wishlist.com" och "guest@wishlist.com" i Authentication-fliken, ge dessa lösenord enligt önskemål från brudparet

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
