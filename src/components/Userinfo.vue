<template>
  <div class="Userinfo">
    <!-- 加载动画 -->
    <div class="loading" v-if="isloading">
      <img src="../assets/timg.gif" alt />
    </div>
    <!-- 内容 -->
    <div class="userInfomation" v-else>
      <div class="zhuye">
         <router-link :to="{
          name:'root'
        }">
          <span>主页 /</span>
        </router-link>
      </div>
      <section class="user_top">
        <a href="javascript:location.reload();">
          <img :src="userinfo.avatar_url" alt />
        </a>
        <span class="user_name">{{userinfo.loginname}}</span>
        <p>{{userinfo.score}}积分</p>
        <p class="creat_at">注册时间:{{userinfo.create_at | formatDate}}</p>
      </section>
      <!-- 最近创建话题 -->
      <div class="topics_current">最近创建的话题</div>
      <div class="topics" v-for="topic in userinfo.recent_topics">
        <a href="javascript:location.reload();">
          <img :src="userinfo.avatar_url" alt />
        </a>
        <span>
          <router-link
            :to="{
              name:'post_article',
              params:{
                  id:topic.id
              }
          }"
          >{{topic.title}}</router-link>
        </span>
      </div>
      <!-- 最近参与的话题 -->
      <div class="topics_current">最近参与的话题</div>
      <div class="topics" v-for="(attend,index) in userinfo.recent_replies" :key="index">
        <router-link
          :to="{
              name:'user_info',
              params:{
                  name:attend.author.loginname
              }
          }"
        >
          <img :src="attend.author.avatar_url" alt />
        </router-link>
        <span>
          <router-link
            :to="{
              name:'post_article',
              params:{
                  id:attend.id
              }
          }"
          >{{attend.title}}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Userinfo",
  data() {
    return {
      isloading: false,
      userinfo: {}
    };
  },
  methods: {
    getinfo() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          (this.isloading = false), (this.userinfo = res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isloading = true;
    this.getinfo();
  }
};
</script>

<style scoped>
.loading {
  width: 200px;
  margin: 50vh auto 0;
  transform: translateY(-50%);
  text-align: center;
}
.Userinfo .loading img {
  width: 100px;
  height: 88px;
}
.userInfomation {
  /* background: white; */
  width: 75%;
  margin: 10px auto;
}
.userInfomation .zhuye {
  font-size: 14px;
  padding: 10px;
  background-color: #f6f6f6;
}
.userInfomation .zhuye a {
  color: #80bd01;
  text-decoration: none;
}
.userInfomation section {
  background: white;
  padding: 12px;
  font-size: 14px;
}
.userInfomation section .creat_at {
  color: #ababab;
}
.userInfomation .user_top img {
  width: 40px;
}
.userInfomation .topics {
  background: white;
  padding: 10px;
}
.userInfomation .topics a {
  text-decoration: none;
  vertical-align: top;
  line-height: 32px;
  color: #08c;
}
.userInfomation .topics a:hover {
  color: #005580;
  text-decoration: underline;
}
.userInfomation .topics_current {
  margin-top: 10px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.userInfomation .topics img {
  width: 30px;
}
.userInfomation .topics span {
  font-size: 16px;
  vertical-align: top;
  color: #08c;
  line-height: 32px;
}
.userInfomation li {
  list-style: none;
}
.userInfomation .user_name {
  color: #778087;
  font-size: 14px;
  vertical-align: top;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 16px;
  border-top: 1px #dddddd solid;
}
</style>
