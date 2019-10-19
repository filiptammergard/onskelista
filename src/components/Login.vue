<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-md"></div>
        <div class="col-md-6">
          <p class="alert alert-primary alert-custom">
            <strong>Hej och välkommen!</strong> Logga in för att få åtkomst till önskelistan.
          </p>
          <div class="card text-center shadow">
            <h1 class="card-header">{{ man }} &amp; {{ woman }}s önskelista</h1>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="form-group">
                  <input
                    v-model="password"
                    type="password"
                    autofocus
                    class="form-control"
                    autocomplete="current-password"
                    placeholder="Lösenord"
                  />
                </div>
                <button type="submit" class="btn btn-primary btn-custom">{{ loginBtnText }}</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      password: "",
      loginBtnText: "Logga in"
    };
  },
  computed: {
    ...mapState(["adminPassword", "guestPassword", "man", "woman"]),
    email() {
      if (this.password == this.adminPassword) {
        return "admin@wishlist.com";
      } else if (this.password == this.guestPassword) {
        return "guest@wishlist.com";
      } else {
        return "";
      }
    }
  },
  methods: {
    ...mapActions(["login", "logout"]),
    async login() {
      this.loginBtnText = "Loggar in...";
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(() => {
          alert("Fel lösenord. Försök igen.");
        });
      this.password = "";
      this.loginBtnText = "Logga in";
    }
  }
};
</script>

<style lang="scss">
#login {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>