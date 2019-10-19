import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import db from "@/components/firebaseInit";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // TODO: Change adminPassword & guestPassword depending on settings in Firestore Auth
    adminPassword: "duochjagtammergard",
    guestPassword: "guestguest",

    // TODO: Change firstPerson & secondPerosn depending on the names of the bridal couple
    firstPerson: "",
    secondPerson: "",

    wishes: [],
    isLoggedIn: false,
    isAdmin: false,
    unsubscribe: null,
    booked: false
  },
  mutations: {
    fetchWishes(state, wishes) {
      state.wishes = wishes;
    },
    unsubscribeHandler(state, unsubscribe) {
      state.unsubscribe = unsubscribe;
    },
    updateWishes(state, wishes) {
      state.wishes = wishes;
    },
    logout(state) {
      state.unsubscribe();
    },
    nowAdmin(state) {
      state.isAdmin = true;
    },
    nowLoggedIn(state) {
      state.isGuest = true;
    },
    bookedTrue(state) {
      state.booked = true;
    },
    bookedFalse(state) {
      setTimeout(() => {
        state.booked = false;
      }, 300);
    }
  },
  actions: {
    fetchWishes({ commit }) {
      const unsubscribe = db
        .collection("wishes")
        .orderBy("order")
        .onSnapshot(querySnapshot => {
          let wishes = [];
          querySnapshot.forEach(doc => {
            wishes.push({
              id: doc.id,
              item: doc.data().item,
              amount: doc.data().amount,
              specification: doc.data().specification,
              link: doc.data().link,
              given: doc.data().given,
              order: doc.data().order,
              bookingAmount: 1
            });
          });
          commit("fetchWishes", wishes);
          commit("unsubscribeHandler", unsubscribe);
        });
    },
    updateWishes(context, wishes) {
      context.commit("updateWishes", wishes);
    },

    logout({ commit }) {
      commit("logout");
      firebase.auth().signOut();
    },
    nowAdmin({ commit }) {
      commit("nowAdmin");
    },
    nowLoggedIn({ commit }) {
      commit("nowLoggedIn");
    },
    bookWish(context, wish) {
      db.collection("wishes")
        .doc(wish.id)
        .update({ given: wish.given + wish.bookingAmount });
      db.collection("wishes")
        .doc(wish.id)
        .collection("bookings")
        .add({
          booking_amount: Number(wish.bookingAmount),
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      context.commit("bookedTrue");
      //}
    },
    bookedFalse({ commit }) {
      commit("bookedFalse");
    },
    addWish(context, wish) {
      db.collection("wishes")
        .orderBy("order")
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length) {
            db.collection("wishes")
              .add({
                item: wish.item,
                amount: Number(wish.amount),
                specification: wish.specification,
                link: wish.link,
                order: querySnapshot.docs[querySnapshot.docs.length - 1].data().order + 1,
                given: 0
              })
              .then(router.push({ name: "home" }));
          } else {
            db.collection("wishes")
              .add({
                item: wish.item,
                amount: Number(wish.amount),
                specification: wish.specification,
                link: wish.link,
                order: 0,
                given: 0
              })
              .then(router.push({ name: "home" }));
          }
        });
    },
    async editWish(context, wish) {
      let given = await db
        .collection("wishes")
        .doc(router.currentRoute.params.id)
        .get()
        .then(doc => {
          return doc.data().given;
        });

      if (Number(wish.amount) >= given) {
        db.collection("wishes")
          .doc(router.currentRoute.params.id)
          .update({
            item: wish.item,
            amount: Number(wish.amount),
            specification: wish.specification,
            link: wish.link
          });
        router.push({ name: "home" });
      } else {
        alert(
          'Du kan inte ändra antalet önskade av önsketipset "' +
            wish.item +
            '" så att det understiger vad som redan är bokat. Var vänlig försök igen.'
        );
      }
    },
    async deleteWish() {
      let wish = await db
        .collection("wishes")
        .doc(router.currentRoute.params.id)
        .get()
        .then(doc => {
          return doc.data();
        });
      if (
        confirm(
          'Är du säker på att du vill radera önsketipset "' + wish.item + '" från önskelistan?'
        )
      ) {
        db.collection("wishes")
          .doc(router.currentRoute.params.id)
          .delete();
        router.push({ name: "home" });
        db.collection("wishes")
          .where("order", ">", wish.order)
          .orderBy("order")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              db.collection("wishes")
                .doc(doc.id)
                .update({ order: doc.data().order - 1 });
            });
          });
      }
    },
    onEnd(context, e) {
      db.collection("wishes")
        .orderBy("order")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (e.newIndex > e.oldIndex) {
              if (doc.data().order == e.oldIndex) {
                db.collection("wishes")
                  .doc(doc.id)
                  .update({ order: e.newIndex });
              } else if (doc.data().order > e.oldIndex && doc.data().order <= e.newIndex) {
                db.collection("wishes")
                  .doc(doc.id)
                  .update({ order: doc.data().order - 1 });
              }
            } else if (e.newIndex < e.oldIndex) {
              if (doc.data().order < e.oldIndex && doc.data().order >= e.newIndex) {
                db.collection("wishes")
                  .doc(doc.id)
                  .update({ order: doc.data().order + 1 });
              } else if (doc.data().order == e.oldIndex) {
                db.collection("wishes")
                  .doc(doc.id)
                  .update({ order: e.newIndex });
              }
            }
          });
        });
    }
  }
});
