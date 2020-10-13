<template>
    <el-container class="app-container">
        <el-header class="app-container-header">
            <Header></Header>
        </el-header>
        <el-container class="app-container-body">
            <el-aside class="app-container-body-aside" width="200px">
                <Nav></Nav>
            </el-aside>
            <el-main class="app-container-body-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Nav from "../components/Nav";
import Header from "../components/Header";
export default {
    name: "Layout",
    components: {
        Nav,
        Header,
    },
};
</script>
<style lang="less" scoped>
.app-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    &-header {
        border-bottom: 1px solid #e6e6e6;
    }
    &-body {
        &-aside {
            border-right: 1px solid #e6e6e6;
        }
    }
}
</style>