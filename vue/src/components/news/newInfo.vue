<template>
    <div class="newsInfo_container">
        <h4 class="title">{{newsInfo.title}}</h4>
        <p class="subTitle">
            <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsInfo.click}}次</span>
        </p>
        <hr>

        <!--内容区域-->
        <div v-html="newsInfo.content">
        </div>

        <!--评论区域，调用子组件-->
        <comment :id="id"></comment>

    </div>
</template>

<script>
    //导入子组件
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "newInfo",
        //2、定义子组件
        components:{
            comment
        },
        data(){
            return {
                id:this.$route.params.id,
                newsInfo:{},
            }
        },
        methods:{
          getNewsInfo(){
              this.$http.get("http://www.liulongbin.top:3005/api/getnew/"+this.id).then(result=>{
                  if(result.body.status===0){
                      console.log(result.body);
                      this.newsInfo=result.body.message[0];
                  }
              });
          }
        },
        created() {
            this.getNewsInfo();
        }
    }
</script>

<style scoped lang="scss">
    .newsInfo_container{
        padding: 0 5px;
        .title{
            font-size: 16px;
            text-align: center;
            color:red;
            margin: 14px 0;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            color: blue;
            font-size: 14px;
        }
    }
</style>