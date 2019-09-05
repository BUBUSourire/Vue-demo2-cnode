<template>
  <div class="article">
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1386767_bkhvxtm794.css" />
    <!-- <div class="loading" v-if="isloading"> -->
      <!-- <img src="../assets/timg.gif" alt /> -->
    <!-- </div> -->
    <div>
      <!-- 正文头部 -->
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul>
          <li>•发布于{{post.create_at | formatDate}}</li>
          <li>•作者:{{post.author.loginname}}</li>
          <li>•{{post.visit_count}}次浏览</li>
          <li>•来自 {{post | classification}}</li>
        </ul>
        <div v-html="post.content" class="topic_content"></div>
      </div>
      <!-- 评论 -->
      <div id="reply">
        <div class="topbar">{{post.reply_count}}回复</div>
        <div v-for="(reply,index) in post.replies" :key="index" class="pencle">
          <router-link
            :to="{
              name:'user_info',
              params:{
                  name:reply.author.loginname
              }
          }"
          >
            <img :src="reply.author.avatar_url" alt />

            <span class="author_name">{{reply.author.loginname}}</span>
          </router-link>
          <span class="author_day">{{index+1}}楼•{{reply.create_at | formatDate}}</span>
          <span v-if="reply.ups.length>0" class="dianzan">
            <i class="iconfont icon-dianzan"></i>
            <span class="dianzan_txt">{{reply.ups.length}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Article",
  data() {
    return {
      isloading: false,
      post: {}
    };
  },
  methods: {
    getArticle() {
      this.$http
        .get(` https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          if (res.data.success === true) {
            this.isloading = false;
            this.post = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isloading = true;
    this.getArticle();
  }
};
</script>

<style>
@import url("../assets/markdown-github.css");
/* .loading {
  width: 200px;
  margin: 50vh auto 0;
  transform: translateY(-50%);
  text-align: center;
}
.article .loading img {
  width: 100px;
  height: 88px;
} */
.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
}

#reply .pencle {
  padding-right: 10px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  position: relative;
  padding: 10px 0 10px 10px;
  font-size: 14px;
}

#reply .author_name {
  color: #666;
  font-weight: 700;
}
#reply .author_day {
  color: #08c;
  font-size: 10px;
}
#reply .dianzan {
  float: right;
  margin-right: 20px;
  line-height: 30px;
}
#reply .dianzan img {
  width: 15px;
  height: 15px;
}
#reply .dianzan .dianzan_txt {
  font-size: 12px;
}
#reply .dianzan .icon-dianzan:before {
  font-size: 14px;
}
#reply img {
  width: 30px;
  height: 30px;
  position: relative;
}

#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}

.markdown-text img {
  width: 92% !important;
}
</style>
