<template>
    <div>
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl"
                 class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a v-for="item in cates"
                       :key="item.id"
                       :class="['mui-control-item',item.id==0?'mui-active':'']"
                       @click="getPhotoList(item.id)"
                       href="#item1mobile">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!--图片列表区域-->
        <ul class="photoList">
            <router-link :to="'/home/photosInfo/'+item.id" v-for="item in photosList" :key="item.id" tag="li">
                <img v-lazy="item.img_url" alt="">
                <div class="info">
                    <h4>{{item.title}}</h4>
                    <div class="mui-ellipsis-2">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    /*局部导入js文件*/
    import mui from '../../lib/mui/js/mui.min'
    //报错  分析：1、mui.js可能用到了caller,callee,arguments等属性，但是webpack打包好的main.js
    //中，可能默认启用了严格模式，所以两者冲突
    //解决方案：1、把mui.js中的非严格模式改掉，不显示
    //         2、禁用webpack的严格模式
    export default {
        name: "photosList",
        mounted() {
            //在mounted里面操作，代表DOM元素以及渲染完成
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            //3、tab栏失效，样式与导入的mui.js冲突，修改mui-tab-item的类名，样式不变
        },
        data() {
            return {
                cates: [],
                photosList: [],
            }
        },
        methods: {
            //4、获取图片分类的数据
            getAllCategory() {
                this.$http.get("api/getimgcategory").then(result => {
                    if (result.body.status === 0) {
                        result.body.message.unshift({
                            title: "全部",
                            id: 0,
                        });
                        this.cates = result.body.message;
                    }
                });
            },
            getPhotoList(id) {
                console.log(id);
                this.$http.get("api/getimages/" + id).then(result => {
                    if (result.body.status === 0) {
                        this.photosList = result.body.message;
                    }
                });
            }
        },
        created() {
            this.getAllCategory();
            this.getPhotoList(0);
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }

    .photoList {
        margin: 0;
        padding: 5px;

        li {
            list-style: none;
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0px 0px 10px #999;
            position: relative;

            img {
                width: 100%;
                display: block;
            }

            /*懒加载图片的样式*/
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }
        .info{
            position: absolute;
            bottom: 0;
            left: 0;
            color: #fff;
            line-height: 25px;
            background-color: rgba(0,0,0,.3);
        }
    }
</style>