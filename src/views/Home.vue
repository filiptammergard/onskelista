<template>
  <div>
    <Login v-if="!isLoggedIn" />
    <Wishlist v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Wishlist from "@/components/Wishlist.vue";
import Login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    Wishlist,
    Login
  },
  computed: {
    ...mapState(["isLoggedIn"])
  }
};
</script>