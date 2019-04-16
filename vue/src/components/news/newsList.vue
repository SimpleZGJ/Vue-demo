<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <!--1. 把a改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符-->
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h2>{{  item.title }}</h2>
                        <p class="mui-ellipsis">
                            <span>发表时间: {{ item.add_time | dateFormat}}</span>
                            <span>点击次数:{{ item.click }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "newsList",
        data(){
            return{
                newsList:[]
            }
        },
        created(){
            this.getNewsList()
        },
        methods:{
            getNewsList(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then( result => {
                    if(result.body.status === 0){
                        //请求成功
                        this.newsList = result.body.message;
                        console.log(this.newsList)
                    }else{
                        Toast('获取数据失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view {
        li {
            h2 {
                font-size: 14px;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
