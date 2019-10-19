# Önskelista demo

## Att ändra

I Firebase:

- Start ett nytt projekt och ge det namnet wishlist-förnamnförnamn
- Skapa en collection med namnet "wishes" i Database-fliken
- Skapa användare "admin@wishlist.com" och "guest@wishlist.com" i Authentication-fliken, ge dessa lösenord enligt önskemål från brudparet

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
