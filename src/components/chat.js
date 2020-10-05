import Vue from 'vue';
import Vuex from "vuex";

import chatStore from '../store/chat.js';
import eventBus from '../modules/EventBus.js';

Vue.use(Vuex);

const chat = Vue.component("chat", {
    chatStore,
    template: `
        <div>
            <h1>Chatt</h1>
            <h2>Meddelanden</h2>
            <div
                id="all-messages"
                class="all-messages"
            >
                <p v-for="message in messagesReceived">
                    <span class="messageInfo">
                        <span class="messageSpan messageName">{{ message.nick }}</span>
                        <span class="messageSpan messageTime">{{ message.time }}</span>
                    </span>
                    <span class="messageSpan messageMessage">{{ message.message }}</span>
                </p>
            </div>

            <input
                placeholder="Skriv ett meddelande"
                id="new-message"
                ref="messageInput"
                class="new-message"
                value="messageToSend"
                v-model="messageToSend"
                @change="setNewMessage($event.target.value)"
                @keyup=keyUp
            />
        </div>
    `,
    data() {
        return {
            messageToSend: "",
        };
    },
    computed: {
      messagesReceived () {
          return chatStore.state.messagesReceived;
      }
    },
    methods: {
        keyUp(e) {
            if (e.key === "Enter" && this.messageToSend != "") {
                this.$socket.emit("chat message", { nick: this.$root.chatNick, message: this.messageToSend });
                this.clearInput();
            }
        },
        setNewMessage(val) {
            this.messageToSend = val;
        },
        clearInput() {
            this.messageToSend = "";
        },
        focusInput() {
            this.$refs.messageInput.focus();
        }
    },
    created () {
        this.$options.sockets.["chat message"] = (message) => {
            chatStore.commit("addMessage", message);
        };

        this.$options.sockets.["nick joined"] = (message) => {
            chatStore.commit("addMessage", message);
        };

        this.$options.sockets.["nick left"] = (message) => {
            chatStore.commit("addMessage", message);
        };

        if (!this.$root.chatRegistered) {
            this.$socket.emit("new nick", this.$root.chatNick);
            eventBus.$emit("register-chat");
        }
    },
    mounted() {
        this.focusInput();
    }
});

export default {
    components: {
        "chat": chat
    }
};
