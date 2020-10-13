<template>
    <div class="header">
        <div class="header-title">土地众筹后台管理</div>
        <div class="header-info">管理员 您好！</div>
    </div>
</template>

<script>
export default {
    name: "Header",
};
</script>
<style lang="less" scoped>
.header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
        font-weight: bolder;
        font-size: 18px;
    }
}
</style>