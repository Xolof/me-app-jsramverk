import Vue from 'vue';
import App from './App.vue';
import VueSimpleMarkdown from 'vue-simple-markdown';

import router from './router';
import eventBus from "./modules/EventBus";
import registerForm from "./components/registerForm";
import loginForm from "./components/loginForm";
import statusBar from "./components/statusBar";
import mainNav from "./components/mainNav";
import reports from "./components/Reports";
import presentation from "./components/presentation";
import chat from "./components/chat";
import chatSignIn from "./components/chatSignIn";

const api = "https://me-api.oljo.me";

Mock API
import { makeServer } from "./server"
if (process.env.NODE_ENV === "development") {
    makeServer()
}

Vue.config.productionTip = false;

Vue.use(VueSimpleMarkdown);

new Vue({
    router,
    components: {
        "main-nav": mainNav,
        "register-form": registerForm,
        "login-form": loginForm,
        "status-bar": statusBar,
        "reports": reports,
        "presentation": presentation,
        "chat": chat,
        "chat-sign-in": chatSignIn,
    },
    data() {
        return {
            loggedIn: false,
            token: null,
            user: "Kjell",
            chatNick: false,
            chatRegistered: false,
            chatLoaded: false,
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
        },
        setChatNick(nick) {
            this.chatNick = nick;
        },
        registerChat() {
            this.chatRegistered = true;
        },
        setChatLoaded() {
            this.chatLoaded = true;
        },
    },
    mounted() {
        eventBus.$on("log-in", (data) => {
            this.logIn(data);
        });
        eventBus.$on("log-out", () => {
            this.logOut();
        });
        eventBus.$on("set-chat-nick", (nick) => {
            this.setChatNick(nick);
            this.$router.push("/chat");
        });
        eventBus.$on("register-chat", () => {
            this.registerChat();
        });
        eventBus.$on("chat-loaded", () => {
            this.setChatLoaded();
        });
    },
    render: h => h(App)
}).$mount('#app');

export default api;
