<template>
  <div class="PostList">
    <!-- 加载动画 -->
    <div class="loading" v-if="isloading">
      <img src="../assets/timg.gif" alt />
    </div>
    <!-- 帖子列表 -->
    <div class="posts" v-else>
      <ul>
        <li>
          <div class="toobar">
            <span @click="changeTab">全部</span>
            <span @click="changeTab">精华</span>
            <span @click="changeTab">分享</span>
            <span @click="changeTab">问答</span>
            <span @click="changeTab">招聘</span>
          </div>
        </li>
        <li v-for="(post,index) in posts" :key="index">
          <router-link
            :to="{
            name:'user_info',
            params:{
              name:post.author.loginname
            }
          }"
          >
            <img :src="post.author.avatar_url" alt />
          </router-link>
          <!-- 回复浏览 -->
          <span class="reply">
            <span class="reply_count">{{post.reply_count}}</span>
            /{{post.visit_count}}
          </span>
          <!-- 帖子分类 -->
          <span
            :class="[{put_good:(post.good===true),
            put_top:(post.top===true),
            topiclist_tab:(post.good!==true&&post.top!==true)}]"
          >
            <span>{{post | classification}}</span>
          </span>
          <!-- 标题 -->
          <router-link
            :to="{
              name:'post_article',
              params:{
                  id:post.id,
                  name:post.author.loginname
              }
          }"
          >
            <span>{{post.title}}</span>
          </router-link>
          <!-- 时间 -->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <pageination @handleList="changeList"></pageination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pageination from "./Pageination";
export default {
  name: "Postlists",
  data() {
    return {
      isloading: false,
      posts: [], //列表数组
      postpage: 1,
      tab: ""
    };
  },
  components: {
    pageination
  },
  methods: {
    getMsg() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.postpage,
            limit: 15,
            tab: this.tab
          }
        })
        .then(res => {
          this.isloading = false;
          this.posts = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeList(value) {
      this.postpage = value;
      this.getMsg();
    },
    changeTab(e) {
      console.log(e.path[0].innerText);
      switch (e.path[0].innerText) {
        case "全部":
          this.tab = "all";
          this.getMsg();
          break;
        case "精华":
          this.tab = "good";
          this.getMsg();
          break;
        case "分享":
          this.tab = "share";
          this.getMsg();
          break;
        case "问答":
          this.tab = "ask";
          this.getMsg();
          break;
        case "招聘":
          this.tab = "job";
          this.getMsg();
          break;
      }
    }
  },
  //页面加载之前执行
  beforeMount() {
    this.isloading = true;
    this.getMsg();
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
.PostList .loading img {
  width: 100px;
  height: 88px;
}
.PostList {
  background-color: #e1e1e1;
}

.posts {
  margin-top: 10px;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
.reply {
  color: rgb(151, 151, 151);
  font-size: 10px;
  padding: 0 10px;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist_tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

/* .loading {
  text-align: center;
  padding-top: 300px;
} */
</style>
