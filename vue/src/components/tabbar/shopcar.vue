<template>
    <div class="shopcar_container list-info">
        <div v-for="(item,i) in goodsList" :key="item.id" class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch
                            v-model="$store.state.car[i].selected"
                            @change="selected(item.id,$store.state.car[i].selected)"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span class="price">{{item.sell_price}}元</span>
                            <number :initCount="$store.getters.getGoodsCount[item.id]" :goods-id="item.id"></number>
                            <a href="#" @click.prevent="remove(i,item.id)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left"><p><font
                            style="vertical-align: inherit;"><font
                            style="vertical-align: inherit;">总计（不含运费）</font></font></p>
                        <p><font style="vertical-align: inherit;"><font
                                style="vertical-align: inherit;">已勾选商品</font></font><span
                                class="red"><font
                                style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        {{$store.getters.getTotal.count}}</font></font></span><font style="vertical-align: inherit;"><font
                                style="vertical-align: inherit;">件，总价</font></font><span class="red"><font
                                style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            ¥{{$store.getters.getTotal.price}}
                        </font></font></span></p></div>
                    <button class="mint-button mint-button--danger mint-button--normal"><!----><label
                            class="mint-button-text"><font style="vertical-align: inherit;"><font
                            style="vertical-align: inherit;">去结算</font></font></label></button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import number from "../subcomponents/shopcar_number.vue"

    export default {
        name: "shopcar",
        components: {
            number,
        },
        data() {
            return {
                goodsList: [],
            }
        },
        methods: {
            //1、获取购物车商品列表
            getGoodsList() {
                //获取商品id
                let idArr = [];
                this.$store.state.car.forEach(item => {
                    idArr.push(item.id);
                });
                if (idArr.length <= 0) return false;
                this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(res => {
                    console.log(res.body.message);
                    if (res.body.status === 0) {
                        this.goodsList = res.body.message;
                    }
                });

            },
            remove(index, id) {
                this.goodsList.splice(index, 1);
                this.$store.commit("removeGoods", id);
            }
            , selected(id, selected) {
                this.$store.commit('updateStatus', {id, selected});
            }
        },
        created() {
            this.getGoodsList();
        }
    }
</script>

<style scoped lang="scss">
    .shopcar_container.list-info {
        background-color: #eee;
        overflow: hidden;

        .mui-card-content-inner {
            display: flex;
            /*纵向居中*/
            align-items: center;

            img {
                width: 50px;
                margin: 0 5px;
            }

            h1 {
                font-size: 14px;
            }

            .info {
                .price {
                    color: red;
                    font-weight: bolder;
                }

                p {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }
            }
        }

        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>