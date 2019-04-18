<template>
    <div class="goodsInfo_container">
        <!--小球-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="banner" :isFull="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>{{goodsInfo.market_price}}元</del>
                        销售价：<span>{{goodsInfo.sell_price}}元</span>
                    </p>
                    <p>
                        购买数量：
                        <number :max="goodsInfo.stock_quantity" @getCount="getNum"></number>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCart()">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>商品情况：{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button @click="getDesc()" type="primary" size="large" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    import number from '../subcomponents/goodsInfo_number.vue'

    export default {
        name: "goodsInfo",
        components: {
            swiper,
            number
        },
        data() {
            return {
                id: this.$route.params.id,
                banner: [],
                goodsInfo: [],
                flag: false,
                count: 1,
                num: 0,
            }
        },
        methods: {
            //1、获取轮播图的数据
            getBanner() {
                this.$http.get("api/getthumimages/" + this.id).then(res => {
                    if (res.body.status === 0) {
                        //应为封装的原因，路径不一致
                        res.body.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.banner = res.body.message;
                    }
                });
            },
            //获取商品信息
            getInfo() {
                this.$http.get("api/goods/getinfo/" + this.id).then(res => {
                    if (res.body.status === 0)
                        this.goodsInfo = res.body.message[0];
                });
            },
            getDesc() {
                this.$router.push({
                    name: "goodsdesc",
                    params: {id: this.id}
                });
            },
            //添加购物车
            addCart() {
                this.num++;
                if (this.num < 2) {
                    this.flag = !this.flag;
                }

                //点击添加到购物车，把信息保存到store中的数据中的 car
                //每一条数据都是对象：{id:商品id,count:购买的数量，商品单价：selected：商品状态}
                let goodsList = {
                    id: this.id,
                    count: this.count,
                    price: this.goodsInfo.sell_price,
                    selected: true,
                }
                this.$store.commit("addToCar", goodsList);
            },
            //设置小球的动画
            beforeEnter(el) {
                if (this.num < 2) {
                    el.style.transform = "translate(0,0)";
                }
            },
            enter(el) {
                if (this.num < 2) {

                    el.offsetWidth;

                    //解决因分辨率不同，需要计算坐标-->Element.getBoundingClientRect()
                    let ball = document.querySelector(".ball").getBoundingClientRect();
                    //获取徽标的位置:关于dom元素和所在的组件没有任何关系
                    let badge = document.querySelector(".mui-badge").getBoundingClientRect();
                    //求差
                    let x = badge.left - ball.left;
                    let y = badge.top - ball.top;

                    el.style.transition = "all 1s cubic-bezier(.4,-0.3,.89,.67)";
                    // el.style.transform="translate(70px,201px)";
                    el.style.transform = `translate(${x}px,${y}px)`;
                    // done();
                }
            },
            afterEnter(el) {
                el.style.transition = "all 0s cubic-bezier(.4,-0.3,.89,.67)";
                this.flag = !this.flag;
                this.num = 0;
            },

            getNum(num) {
                this.count = num;
            }
        },
        created() {
            this.getBanner();
            this.getInfo();
        }
    }
</script>

<style scoped lang="scss">
    .goodsInfo_container {
        background-color: #eee;
        /*解决垂直方向外边距塌陷*/
        overflow: hidden;

        .nowPrice {
            font-weight: bolder;
            color: red;
            font-size: 16px;
        }

        .mui-card-footer {
            display: block;

            button {
                margin: 10px 0;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            left: 165px;
            top: 420px;
            z-index: 99;
        }
    }
</style>