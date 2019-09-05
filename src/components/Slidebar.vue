<template>
  <div class="autherinfo">
    <!-- 关于作者 -->
    <div class="authersummary">
      <div class="topbar">作者</div>
      <div class="authersummary_inner">
        <router-link
          :to="{
              name:'user_info',
              params:{
                  name:userinfo.loginname
              }
          }"
        >
          <img :src="userinfo.avatar_url" alt />
          <span class="topbar_name">{{userinfo.loginname}}</span>
        </router-link>
        <p>积分:{{userinfo.score}}</p>
      </div>
    </div>
    <!-- 作者其它话题 -->
    <div class="recent_topics">
      <div class="topbar">作者其它话题</div>
      <ul>
        <li v-for="topic in userinfo.recent_topics">
          <router-link
            :to="{
                  name:'post_article',
                  params:{
                      id:topic.id
                  }
              }"
          >{{topic.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">无人回复的话题</div>
      <ul>
        <li v-for="topic in userinfo.recent_replies">
          <router-link
            :to="{
                  name:'post_article',
                  params:{
                      id:topic.id
                  }
              }"
          >{{topic.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slidebar",
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
          this.userinfo = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getinfo();
  }
};
</script>

<style scoped>
.autherinfo {
  float: right;
  right: 0;
  margin-top: -10px;
  width: 328px;
}
.autherinfo a {
  text-decoration: none;
}
.authersummary,
.recent_replies,
.recent_topics {
  background-color: #fff;
}
.authersummary_inner {
  padding: 10px;
}
p {
  padding: 0;
  margin: 0;
}
.topbar_name {
  vertical-align: top;
  line-height: 66px;
  font-size: 16px;
  color: #778087;
}
li {
  padding: 10px 5px 10px 10px;
  list-style: none;
}
.recent_replies ul,
.recent_topics ul {
  padding: 0;
  margin: 0;
}
.recent_info ul {
  margin-left: -30px;
}
ul a {
  font-size: 12px;
  text-decoration: none;
  color: #778087;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

img {
  height: 48px;
  width: 48px;
  border-radius: 3px;
}

.authersummay .topbar {
  margin-top: 0px;
}
</style>
