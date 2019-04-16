<template>
    <div class="goodsDesc_container">
        <h3 class="title">{{descInfo.title}}</h3>
        <hr>
        <div class="content" v-html="descInfo.content">
        </div>
    </div>
</template>

<script>
    export default {
        name: "goodsDesc",
        data(){
          return {
              id:this.$route.params.id,
              descInfo:[],
          }
        },
        methods:{
            getDesc(){
                this.$http.get("api/goods/getdesc/"+this.id).then(res=>{
                    if(res.body.status===0)
                        this.descInfo=res.body.message[0];
                });
            }
        }
        ,created(){
            this.getDesc();
        }

    }
</script>

<style scoped lang="scss">
.goodsDesc_container{
    .title{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
}
</style>