import Vue from 'vue';
import eventBus from "../modules/EventBus";

const statusBar = Vue.component("main-nav", {
    template: `
    <div id="nav">
      <router-link to="/">Hem</router-link>
      <router-link to="/reports">Redovisning</router-link>
      <router-link to="/register">Registrera</router-link>
      <router-link v-if="!this.$root.$data.loggedIn" to="/login">Logga in</router-link>
      <a href="#" v-else @click="logOut">Logga ut</a>
    </div>
    `,
    methods: {
        logOut() {
            eventBus.$emit("log-out");
        }
    }
});

export default {
    components: {
        "status-bar": statusBar
    }
};
