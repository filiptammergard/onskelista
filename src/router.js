import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

import firebase from "firebase";

import Home from "./views/Home.vue";
import AddWish from "./views/AddWish.vue";
import EditWish from "./views/EditWish.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Önskelista"
      }
    },
    {
      path: "/ny",
      name: "add-wish",
      component: AddWish,
      meta: {
        adminRequired: true,
        title: "Önskelista | Ny önskesak"
      }
    },
    {
      path: "/ändra/:id",
      name: "edit-wish",
      component: EditWish,
      meta: {
        adminRequired: true,
        title: "Önskelista | Ändra önskesak"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let adminRequired = to.matched.some(record => record.meta.adminRequired);
  let authRequired = to.matched.some(record => record.meta.authRequired);

  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      await store.dispatch("fetchWishes");
      store.state.isLoggedIn = true;

      if (user.email == "admin@wishlist.com") {
        store.state.isAdmin = true;
      }
    } else {
      store.state.isLoggedIn = false;
      store.state.isAdmin = false;
    }
    if (adminRequired && !user) {
      next("/");
    } else if (adminRequired && user.email == "guest@wishlist.com") {
      next("/");
    } else if (authRequired && !user) {
      next("/");
    } else {
      next();
    }
  });
});

router.afterEach(to => {
  const defaultPageTitle = "Önskelista";
  document.title = to.meta.title || defaultPageTitle;
});

export default router;
