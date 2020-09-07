<template>
  <div id="app">
    <div id="header">
        <h1>jsramverk | Olof</h1>
    </div>
    <div id="nav">
      <router-link to="/">Hem</router-link>
      <router-link to="/reports/week/1">kmom01</router-link>
    </div>
    <router-view/>
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

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}

#nav a {
  font-weight: bold;
  color: #595959;
  font-size: 1.5em;
  text-decoration: none;
}

#nav a.router-link-exact-active {
color: #2c3e50;
  text-decoration: underline;
}

.code {
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

.kmom01,
.home {
    text-align: left;
}

.me-img {
    width: 60%;
}

</style>
