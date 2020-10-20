<template>
    <div>
        <el-form class="user-info" ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="form.realName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="handleEdit">修改</el-button>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: "User",
    data() {
        return {
            form: {
                name: "",
                phone: "",
                realName: "",
                email: "",
            },
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        handleEdit() {},
    },
};
</script>
<style lang="less" scoped>
.user-info {
    width: 50%;
}
</style>