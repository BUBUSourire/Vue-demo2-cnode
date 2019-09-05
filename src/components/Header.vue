<template>
  <div class="header">
    <div class="header_inner">
      <router-link :to="{name:'root'}">
        <img src="../assets/cnodejs_light.svg" />
      </router-link>
      <ul>
        <li>
            <router-link :to="{name:'root'}">首页</router-link>
        </li>
        <li>
          <a href="#">关于</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  height: 50px;
  background-color: #444444;
}
.header_inner {
  height: 100%;
  padding: 0 50px;
}
.header_inner img {
  max-width: 120px;
  margin: 10px;
}
.header_inner ul {
  list-style: none;
  float: right;
  margin-top: 15px;
}
.header_inner li {
  display: inline-block;
  padding-right: 30px;
}
.header_inner li a {
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
}
.header_inner li a:hover {
  color: #ffffff;
}
</style>
