<template>
    <div>
        <mt-swipe :auto="4000">
            <!--将来，谁使用，谁就传递bannerList-->
            <mt-swipe-item v-for="item in bannerList" :key="item.id">
                <img :src="item.img" :class="{'full':isFull}" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props: ['bannerList','isFull'],
    }
</script>

<style scoped lang="scss">
    .full{
        width: 100%;
    }
    .mint-swipe {
        height: 200px;

        .mint-swipe-item {
            /*background-color: pink;*/
            text-align: center;
            img {
                /*width: 100%;*/
                height: 100%;
            }
        }
    }

</style>