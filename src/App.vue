<template>
  <div id="app">
    <status-bar v-bind:logged-in="this.$root.$data.loggedIn" />
    <div id="header">
        <h1>jsramverk | Olof</h1>
    </div>
    <main-nav />
    <router-view />
    <footer id="footer">
        Av Olof Johansson för kursen jsramverk
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 760px;
  margin: 0 auto;
}

* {
    box-sizing: border-box;
    margin: 0;
}

h1, h2, h3, a, p, pre {
    margin: 0.2rem 0 1rem;
}

h1, h2, h3 {
    margin-top: 1.2rem;
}

pre {
    margin-top: 0.4rem;
}

.markdown-body {
    padding: 0 0.6em;
}

#nav {
  padding: 30px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}

#nav a {
  font-weight: bold;
  color: #595959;
  font-size: 1.5em;
  text-decoration: none;
  margin: 0 0.6em 0.4em;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
  text-decoration: underline;
}

code {
    background: #2e2b2b;
    color: #ccc;
    padding: 6px 6px 4px;
    border-radius: 2px;
    font-size: 1.2em;
}

#header {
    padding: 1em;
    background: rgb(254,84,84);
    background: linear-gradient(90deg, rgba(254,84,84,1) 0%, rgba(148,228,136,1) 48%, rgba(151,224,245,1) 100%);
}

#footer {
    display:block;
    padding: 0.8em;
    margin-top: 1.4em;
    border-top: 1px solid #ccc;
    width: 100%;
    color: #7c7c7c;
}

.report-text,
.presentation {
    text-align: left;
    margin-bottom: 1.4em;
    font-size: 1.2em;
}

.me-img {
    width: 60%;
}

.message,
.error-message {
    padding: 1em;
}

.message {
    color: green;
}

.error-message {
    color: red;
}

.error-message ul,
.message ul {
    width: 100%;
    margin: 0;
    padding: 0;
}

.error-message ul li {
    margin: 0 0 1.4em;
    width: 100%;
    text-align: center;
}

.status-bar {
    color: #333;
    padding: 0.4em;
    margin: 0;
}

.status-bar.active {
    color: green;
}

.reports-nav ul {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    padding: 0;
}

.reports-nav ul li {
    padding: 1em;
}

.reports-nav ul li a {
    font-size: 1.2em;
    text-decoration: none;
    color: #595959;
}

.reports-nav ul li a.active {
    text-decoration: underline;
    color: #2c3e50;
}

.register-form *,
.login-form *,
.chat-sign-in-form * {
    width: 80%;
    display: block;
    margin: 0 auto;
}

.register-form input,
.login-form input,
.chat-sign-in-form input {
    margin-bottom: 1.4em;
    border: 1px solid #ccc;
    text-align: center;
    padding: 0.6em 0;
    font-size: 1.1em;
}

.register-form input:focus,
.login-form input:focus,
.chat-sign-in-form input:focus {
    border: 2px solid blue;
}

.register-form input[type="submit"],
.login-form input[type="submit"],
.chat-sign-in-form input[type="submit"]
 {
    background: #4bcf88;
    cursor: pointer;
    width: 80%;
}

.register-form input[type="submit"]:hover,
.login-form input[type="submit"]:hover,
.chat-sign-in-form input[type="submit"]:hover {
    background: #97e0f1;
    border: 1px solid #000;
}

.report button,
.report input[type="submit"]
 {
    display: block;
    width: 40%;
    margin: 3em auto 0;
    background: #4bcf88;
    cursor: pointer;
    padding: 0.6em 0;
    font-size: 1.1em;
    border: 1px solid #ccc;
}

.report button:hover,
.report input[type="submit"]:hover {
    background: #97e0f1;
    border: 1px solid #000;
}

.report textarea {
    width: 100%;
    resize: vertical;
    height: 300px;
    min-height: 150px;
    max-height: 400px;
    font-size: 1.2em;
}

.all-messages {
    width: 90%;
    height: 30vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 auto 2rem;
    overflow-y: scroll;
}

.all-messages p {
    margin: 0 auto 0;
    padding: 0.6em 0.4em 1em;
    text-align: left;
}

.all-messages p:nth-child(2n) {
    background-color: #c3f1d1;
}

#new-message {
    width: 90%;
}

.messageInfo {
    display: block;
    color: #134670;
}

.messageMessage {
    display:block;
    margin-top: 0.5em;
}

.messageTime {
    float: right;
}

</style>
