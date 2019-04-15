<template>
    <div class="sub_container">
        <h4>发表评论</h4>
        <hr>
        <textarea v-model="msg" placeholder="请输入评论内容(最多吐槽120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large" @click="postComment()">发表评论</mt-button>
        <div class="list" v-for="(item,i) in comments">
            <div class="user">
                第{{i+1}}楼 用户:{{item.user_name}}
                发表时间：{{item.add_time | dateFormat}}
            </div>
            <div class="body">
                {{item.content}}
            </div>
        </div>
        <!--加载更多-->
        <mt-button type="danger" size="large" plain @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "comment",
        props: ['id'],
        data() {
            return {
                comments: [],
                msg: "",
                pageIndex:1,
            }
        },
        methods: {
            getComment() {
                this.$http.get('api/getcomments/' + this.id + '?pageindex='+this.pageIndex).then(result => {
                    console.log(result);
                    if (result.body.status === 0) {
                        this.comments = this.comments.concat(result.body.message);
                    }
                });
            },
            //点击发表评论
            postComment() {
                if (this.msg.trim().length == 0) {
                    Toast('内容不能为空');
                    return false;
                }
                //参数一：地址，参数二：交给服务器的数据对象，参数三：提交的格式，全局配置后可省略
                this.$http.post("api/postcomment/" + this.id, {content: this.msg}).then(result => {
                    if (result.body.status === 0) {
                        console.log("ok");
                        //拼接出评论对象
                        let user={
                            user_name:"匿名用户",
                            add_time:Date.now(),
                            content:this.msg,
                        }
                        this.comments.unshift(user);
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComment();
            }
        },
        created() {
            this.getComment();
        }
    }
</script>

<style scoped lang="scss">
    .sub_container {
        .list {
            margin: 5px 0;

            .user {
                line-height: 30px;
                background-color: #ccc;
            }

            .body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>