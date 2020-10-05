import Vue from 'vue';
import eventBus from "../modules/EventBus";

const chatSignIn = Vue.component("chat-sign-in", {
    template: `
    <form class="chat-sign-in-form" @submit.prevent="onSubmit">
        <p>
           <input id="chat-nick-input" v-model="nick" ref="nameInput" placeholder="Ditt chatt-namn">
        </p>

        <p>
            <input type="submit" value="Börja chatta" id="chat-sign-in-submit">
        </p>
    </form>
    `,
    data() {
        return {
            nick: "",
        };
    },
    methods: {
        onSubmit() {
            if (this.nick != "") {
                eventBus.$emit("set-chat-nick", this.nick);
            }
        },
        focusInput() {
            this.$refs.nameInput.focus();
        }
    },
    mounted() {
        this.focusInput();
    }
});

export default {
    components: {
        "chat-sign-in": chatSignIn
    }
};
