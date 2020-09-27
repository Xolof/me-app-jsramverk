import Vue from 'vue';
import App from './App.vue';
import router from './router';
import eventBus from "./modules/EventBus";

import VueSimpleMarkdown from 'vue-simple-markdown';
Vue.use(VueSimpleMarkdown);

import registerForm from "./components/registerForm";
import loginForm from "./components/loginForm";
import statusBar from "./components/statusBar";
import mainNav from "./components/mainNav";
import reports from "./components/Reports";
import presentation from "./components/presentation";

Vue.config.productionTip = false;

const api = "https://me-api.oljo.me";

new Vue({
    router,
    components: {
        "main-nav": mainNav,
        "register-form": registerForm,
        "login-form": loginForm,
        "status-bar": statusBar,
        "reports": reports,
        "presentation": presentation,
    },
    data() {
        return {
            loggedIn: false,
            token: null,
            user: "Kjell",
        };
    },
    methods: {
        logIn(data) {
            this.loggedIn = true;
            this.token = data.token;
            this.user = data.user;
            this.$router.push("/reports");
        },
        logOut() {
            this.token = null;
            this.user = null;
            this.loggedIn = false;
        }
    },
    mounted() {
        eventBus.$on("log-in", (data) => {
            this.logIn(data);
        }),
        eventBus.$on("log-out", () => {
            this.logOut();
        });
    },
    render: h => h(App)
}).$mount('#app');

export default api;
