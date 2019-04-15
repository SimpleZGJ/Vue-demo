<template>
    <div class="photoInfo_container">
        <h4>haha</h4>
        <p>
            <span>发表时间：2019</span>
            <span></span>
        </p>
        <hr>
        <div class="thumbs">
            <vue-preview :slides="list">

            </vue-preview>
        </div>
        <!--图片内容-->
        <div>
            这是内容
        </div>
        <!--评论子组件-->

    </div>
</template>

<script>
    export default {
        name: "photoInfo",
        data() {
            return {
                id: this.$route.params.id,
                list: [],//存放缩略图
            }
        },
        methods: {
            //获取缩略图
            getThumbs() {
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    //遍历补全图片的宽高和小图
                    result.body.message.forEach(item => {
                        item.msrc = item.src;
                        item.w = 600;
                        item.h = 400;
                    });
                    this.list = result.body.message;
                    console.log(this.list);
                });
            }
        },
        created() {
            this.getThumbs();
        }
    }
</script>

<style scoped lang="scss">

</style>