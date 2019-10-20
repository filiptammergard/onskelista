<template>
  <div id="wishlist">
    <div class="container">
      <article v-if="isAdmin" class="alert alert-primary alert-custom shadow">
        <h1>Kära brudpar!</h1>
        <p>Här kan ni lägga till nya önsketips och ändra eller ta bort nuvarande. Genom att dra och släppa önsketipsen i listan kan ni också ändra ordning på dem.</p>
      </article>
      <article v-else-if="isLoggedIn" class="alert alert-primary alert-custom shadow">
        <h1>Önskelista</h1>
        <p>På den här sidan har {{ adminWisher }} samlat vad de önskar sig.</p>
        <p>Om du använder en mobil kanske inte hela önskelistan får plats på bredden, men då går det bra att dra med fingret i sidled för att få fram det som inte syns dirket.</p>
      </article>
    </div>
    <br />
    <div class="container table-responsive">
      <table v-if="isLoggedIn" class="table">
        <thead>
          <tr>
            <th v-if="isAdmin">Antal önskade</th>
            <th v-else>Antal kvar</th>
            <th style="min-width:10rem;">Sak</th>
            <th style="min-width:10rem;">Specifikation</th>
            <th>Länk</th>
            <th></th>
          </tr>
        </thead>
        <draggable v-model="wishes" v-if="isAdmin" tag="tbody" @end="onEnd">
          <tr v-for="wish in wishes" :key="wish.id">
            <td>
              <span class="badge badge-pill badge-primary badge-custom">{{ wish.amount }}</span>
            </td>
            <td>{{ wish.item }}</td>
            <td>{{ wish.specification }}</td>
            <td>
              <a v-show="wish.link" :href="wish.link" target="_blank">
                <i class="material-icons">attachment</i>
              </a>
            </td>
            <td>
              <router-link
                tag="button"
                class="btn btn-primary btn-sm btn-custom"
                v-if="isAdmin"
                :to="{ name: 'edit-wish', params: { id: wish.id } }"
              >Ändra</router-link>
            </td>
          </tr>
        </draggable>
        <tbody v-else tag="tbody" @end="onEnd">
          <tr
            v-for="(wish, index) in wishes"
            :key="wish.id"
            :class="{ disabled: wish.amount-wish.given==0 }"
          >
            <td>
              <span
                class="badge badge-pill badge-primary badge-custom"
                :class="{ disabled: wish.amount-wish.given==0 }"
              >{{ wish.amount-wish.given }}</span>
            </td>
            <td>{{ wish.item }}</td>
            <td>{{ wish.specification }}</td>
            <td>
              <a v-show="wish.link" :href="wish.link" target="_blank">
                <i
                  class="material-icons"
                  :class="{ disabled: wish.amount-wish.given==0 }"
                >attachment</i>
              </a>
            </td>
            <td>
              <button
                class="btn btn-primary btn-sm btn-custom"
                :disabled="wish.amount-wish.given==0"
                @click="bookingConfirmation(wish, index)"
              >Boka</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <br />

    <div class="opacity-overlay" :class="{ show: confirm }" @click="bookedFalse(); confirm=false"></div>

    <div class="container container-fixed-centered" :class="{ hide: !confirm }">
      <div class="card text-center shadow">
        <h1 class="card-header">{{ wish.item }}</h1>
        <div class="card-body" v-if="!booked">
          <p>
            Klicka på
            <span class="btn btn-primary btn-sm btn-custom">+</span>- eller
            <span class="btn btn-primary btn-sm btn-custom">−</span>-tecknet för att bestämma antalet av önskesaken
            <strong>{{ wish.item }}</strong> du vill boka.
          </p>
          <p>
            Specifikation:
            <strong>{{ wish.specification }}</strong>
          </p>
          <p v-show="wish.link">
            <a :href="wish.link" target="_blank">Länk</a>
          </p>
          <p>
            Antal önskade:
            <strong>{{ wish.amount }} st</strong>
          </p>
          <p>
            Antal bokade:
            <strong>{{ wish.given }} st</strong>
          </p>
          <div>
            <br />
            <button
              class="btn btn-primary btn-sm btn-custom"
              @click="wish.bookingAmount--"
              :disabled="wish.bookingAmount<=1"
            >−</button>
            <button class="btn btn-primary btn-custom" @click="bookWishHandler(wish)">
              Boka
              <span>{{ wish.bookingAmount }}</span>
            </button>
            <button
              class="btn btn-primary btn-sm btn-custom"
              @click="wish.bookingAmount++"
              :disabled="wish.bookingAmount>=(wish.amount-wish.given)"
            >+</button>
            <br />
            <br />
            <button class="btn btn-secondary" @click="confirm=false">Avbryt</button>
          </div>
        </div>
        <div class="card-body" v-else>
          <h2>Tack för din bokning!</h2>
          <br />
          <p>
            Du har bokat
            <strong>
              {{ wish.bookingAmount }}
              st
            </strong> av önskesaken
            <strong>{{ wish.item }}</strong>.
          </p>
          <p>
            Om någonting blev fel eller om du har en fråga går det bra att höra av sig till
            <a
              target="_blank"
              href="https://tammergard.se/kontakt"
            >Filip Tammergård</a>. Tack!
          </p>
          <br />
          <button
            class="btn btn-primary btn-custom"
            @click="bookedFalse(); confirm=false"
          >Tillbaka till önskelistan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      wish: {},
      confirm: false
    };
  },
  computed: {
    ...mapState(["isLoggedIn", "isAdmin", "booked", "adminWisher"]),
    wishes: {
      get() {
        return this.$store.state.wishes;
      },
      set(wishes) {
        this.updateWishes(wishes);
      }
    }
  },
  components: {
    draggable
  },
  methods: {
    ...mapActions(["bookWish", "onEnd", "updateWishes", "bookedFalse"]),
    bookingConfirmation(wish) {
      this.wish = wish;
      this.confirm = true;
    },
    bookWishHandler(wish) {
      this.bookWish(wish);
    }
  }
};
</script>