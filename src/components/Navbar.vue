<template>
  <div id="navbar" v-if="isAdmin || isLoggedIn">
    <nav class="navbar navbar-expand navbar-dark bg-custom shadow">
      <div class="container">
        <router-link :to="{ name: 'home' }">
          <span class="badge badge-pill badge-secondary badge-custom">{{ adminWisher }}s önskelista</span>
        </router-link>

        <div class="navbar-nav">
          <router-link
            v-if="isAdmin"
            class="nav-item nav-link"
            :class="{ 'active': isRoute('') }"
            :to="{ name: 'home'}"
          >Önskelista</router-link>
          <router-link
            v-if="isAdmin"
            class="nav-item nav-link"
            :class="{ 'active': isRoute('/ny') }"
            :to="{ name: 'add-wish'}"
          >Ny önskesak</router-link>
          <a
            v-if="isLoggedIn"
            style="cursor:pointer"
            class="nav-item nav-link"
            @click="logout"
          >Logga ut</a>
        </div>
      </div>
    </nav>
    <br />
    <br />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["isLoggedIn", "isAdmin", "adminWisher"])
  },
  methods: {
    ...mapActions(["logout"]),
    isRoute(currentRoute) {
      return this.$route.matched.some(route => route.path === currentRoute);
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  overflow-x: auto;
}
.navbar-nav {
  white-space: nowrap;
}
.badge-custom {
  display: none;
}
@media (min-width: 576px) {
  .badge-custom {
    display: inline-block;
  }
}
</style>