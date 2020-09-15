import Vue from 'vue';

const statusBar = Vue.component("status-bar", {
    props: {
        loggedIn: {
            type: Boolean,
        },
    },
    computed: {
        loggedInMsg() {
            return this.loggedIn ? "Inloggad som " + this.$root.$data.user : "Ej inloggad"
        }
    },
    template: `
        <p class="status-bar" v-bind:class="{ active : this.loggedIn }">{{ loggedInMsg }}</p>
    `
});

export default {
    components: {
        "status-bar": statusBar
    }
}
