<template>
    <div class="goods_list">
        <!--<router-link :to="'/home/goodsInfo/'+item.id" v-for="item in list" :key="item.id" tag="div" class="goods_item">-->
            <!--<img :src="item.img_url" alt="">-->
            <!--<h4 class="title">{{item.title}}</h4>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">￥{{item.market_price}}</span>-->
                    <!--<span class="old">￥{{item.sell_price}}</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩余{{item.stock_quantity}}件</span>-->
                <!--</p>-->
            <!--</div>-->
        <!--</router-link>-->
        <div @click="goDetail(item.id)" v-for="item in list" :key="item.id" class="goods_item">
            <img :src="item.img_url" alt="">
            <h4 class="title">{{item.title}}</h4>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.market_price}}</span>
                    <span class="old">￥{{item.sell_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <button @click="getGoods()" class="mint-button mint-button--danger mint-button--large">
            <label class="mint-button-text">加载更多</label>
        </button>
    </div>
</template>

<script>
    export default {
        name: "goodsList",
        data(){
          return {
              list:[],
              pageIndex: 1,
          }
        },
        methods:{
            getGoods(){
                this.$http.get("api/getgoods?pageindex="+this.pageIndex).then(res=>{
                    if(res.body.status===0)this.list=this.list.concat(res.body.message);
                });
            },
            getMore(){
                //加载更多
                this.pageIndex++;
                console.log(this.pageIndex);
                this.getGoods();
            },
            //使用js跳转路由
            goDetail(id){
                console.log(this.$router);
                //this.$route:路由的导航对象
                //this.$router:路由的导航对象，用它可以方便的使用js代码，实现路由前进，后退，跳转到新的url
                //1、最简单的
                // this.$router.push("/home/goodsInfo/"+id);
                //2、传递对象
                // this.$router.push({
                //     path:"/home/goodsInfo/"+id,
                // });
                //3、传递命名路由，给路由设置对应的名字
                this.$router.push({
                    name:"goodsinfo",
                    params:{id}
                });
            }
        },
        created(){
            this.getGoods();
        }
    }
</script>

<style scoped lang="scss">
    .goods_list{
        display: flex;
        /*两端对齐*/
        justify-content: space-between;
        /*让子元素在必要时拆行*/
        flex-wrap: wrap;
        padding: 8px;
        .goods_item{
            width: 49%;
            border:1px solid #ccc;
            box-shadow: 0 0 10px #ccc;
            margin: 5px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img{
                width: 100%;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                    .now{
                        color: red;
                        font-weight: bolder;
                    }
                    .old{
                        font-size: 12px;
                        margin-left: 15px;
                        text-decoration: line-through;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>