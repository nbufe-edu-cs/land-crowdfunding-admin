<template>
    <div class="navBar">
        <el-menu
            :default-active="$route.path"
            router
            class="el-menu-vertical-demo"
            background-color="#ffffff"
            text-color="#000000"
            active-text-color="#A79786"
        >
            <el-menu-item index="/overview">
                <i class="el-icon-menu"></i>
                <span slot="title">概况</span>
            </el-menu-item>
            <el-menu-item index="/land">
                <i class="el-icon-s-grid"></i>
                <span slot="title">我的土地</span>
            </el-menu-item>
            <el-menu-item index="/crowdfunding">
                <i class="el-icon-wallet"></i>
                <span slot="title">众筹管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
                <i class="el-icon-user"></i>
                <span slot="title">个人中心</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Nav",
    methods: {},
};
</script>

<style lang="less" scoped>
@px: 16rem;
.navBar {
    text-align: left;
}
.el-menu {
    border: 0 / @px;
}
</style>