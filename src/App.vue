<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="slidebar" :key="$route.fullPath"></router-view>
      <router-view name="main" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Postlists from "./components/Postlists";
import Article from "./components/Article";
import Userinfo from "./components/Userinfo";
import Slidebar from "./components/Slidebar";

export default {
  name: "App",
  components: {
    Header,
    Postlists,
    Article,
    Userinfo,
    Slidebar
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: #e1e1e1;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
}
.main {
  width: 80%;
  margin: 0 auto;
}
</style>
