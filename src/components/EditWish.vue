<template>
  <div id="edit-wish" class="container">
    <div class="row">
      <div class="col-md"></div>
      <div class="col-md-8">
        <div class="card text-center shadow">
          <h1 class="card-header">Ändra önskesak</h1>
          <div class="card-body">
            <form @submit.prevent="editWish(wishData)">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Önskesak</div>
                </div>
                <input v-model="wishData.item" type="text" class="form-control" required />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Antal</div>
                </div>
                <input v-model="wishData.amount" type="number" class="form-control" required />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Specifikation</div>
                </div>
                <input v-model="wishData.specification" type="text" class="form-control" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Länk</div>
                </div>
                <input v-model="wishData.link" type="text" class="form-control" />
              </div>
              <button :disabled="!validWish" type="submit" class="btn btn-primary btn-custom">Ändra</button>
              <button @click="deleteWish" class="btn btn-danger">Ta bort</button>
              <router-link :to="{ name: 'home' }" class="btn btn-secondary">Tillbaka</router-link>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import db from "@/components/firebaseInit";

export default {
  data() {
    return {
      wishData: {
        item: null,
        amount: null,
        specification: null,
        link: null
      }
    };
  },
  created() {
    if (this.wishes.length) {
      this.wishData = this.wishes.filter(
        wish => wish.id == this.$route.params.id
      )[0];
    } else {
      db.collection("wishes")
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          this.wishData = doc.data();
        });
    }
  },
  computed: {
    ...mapState(["wishes"]),
    validWish() {
      if (
        this.wishData.item != null &&
        this.wishData.amount != null
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions(["editWish", "deleteWish"])
  }
};
</script>
