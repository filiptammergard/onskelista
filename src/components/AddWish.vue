<template>
  <div id="add-wish" class="container">
    <div class="row">
      <div class="col-md"></div>
      <div class="col-md-8">
        <div class="card text-center shadow">
          <h1 class="card-header">Lägg till önskesak</h1>
          <div class="card-body">
            <form @submit.prevent="addWish(wishData)">
              <div class="form-group">
                <input
                  v-model="wishData.item"
                  type="text"
                  autofocus
                  required
                  class="form-control"
                  placeholder="Sak"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="wishData.amount"
                  required
                  type="number"
                  class="form-control"
                  placeholder="Antal"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="wishData.specification"
                  type="text"
                  class="form-control"
                  placeholder="Specifikation"
                />
              </div>
              <div class="form-group">
                <input v-model="wishData.link" type="text" class="form-control" placeholder="Länk" />
              </div>
              <button
                :disabled="!validWish"
                type="submit"
                class="btn btn-primary btn-custom"
              >Lägg till</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
  methods: {
    ...mapActions(["addWish"])
  },
  computed: {
    validWish() {
      if (
        this.wishData.item != null &&
        this.wishData.amount != null &&
        this.wishData.amount > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
