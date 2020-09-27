import Vue from 'vue';

import api from "../main.js";

const registerForm = Vue.component("register-form", {
    template: `
    <form class="register-form" @submit.prevent="onSubmit">
        <p v-if="errors.length" class="error-message" id="error-message">
            <ul>
                <li v-for="error in errors" class="error">{{ error }}</li>
            </ul>
        </p>

        <p v-if="messages.length" class="message">
            <ul>
                <li v-for="message in messages">{{ message }}</li>
            </ul>
        </p>

        <p>
           <label for="email">E-post:</label>
           <input id="email" ref="email" v-model="email" placeholder="E-post">
        </p>

        <p>
            <label for="password">Lösenord:</label>
            <input type="text" id="password" v-model="password" placeholder="Lösenord">
        </p>

        <p>
            <input type="submit" value="Registrera" name="register">
        </p>
    </form>
    `,
    data() {
        return {
            email: "",
            password: "",
            errors: [],
            messages: [],
        };
    },
    methods: {
        validate() {
            this.errors = [];

            // valid email
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(this.email)) {
                this.errors.push("Fyll i en giltig e-post.");
            }

            // valid password
            if (this.password.length < 5) {
                console.log("fyll i lösenord om minst 5 tecken.");
                this.errors.push("Fyll i ett lösenord om minst 5 tecken.");
            }

            if (this.errors.length) {
                return false;
            }

            return true;
        },
        onSubmit() {
            if (this.validate()) {
                let userData = {
                    email: this.email,
                    password: this.password,
                };
                // POST with fetch API

                fetch(api + "/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.data) {
                            if (data.data.status === 201) {
                                this.messages.push("Användaren har registrerats.");
                            }
                        }

                        if (data.errors) {
                            this.errors.push("Registreringen misslyckades.");
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                this.email = "";
                this.password = "";
                this.errors = [];
                this.messages = [];
            }
        },
        focusInput() {
            this.$refs.email.focus();
        }
    },
    mounted() {
        this.focusInput();
    },
});

export default {
    components: {
        "register-form": registerForm
    }
};
