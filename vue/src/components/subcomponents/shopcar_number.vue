<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input @change="countChanged" class="mui-numbox-input" type="number" :value="initCount" ref="num"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js"
    export default {
        name: "goodsInfo_number",
        props:['initCount','goodsId'],
        mounted(){
            //初始化数字控件
            mui(".mui-numbox").numbox();
        },
        methods:{
            //监听数据的改变
            countChanged(){
                //给元素添加ref属性，值自己定义，就能得到$refs对象，可以通过这个对象获取对应的节点一系列的值
                this.$emit("getCount",parseInt(this.$refs.num.value));
                this.$store.commit("updateCount",{
                    id:this.goodsId,
                    count:this.$refs.num.value,
                });
            }
        }
    }
</script>

<style scoped>

</style>