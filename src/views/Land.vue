<template>
    <div class="land">
        <!-- 添加土地Dialog -->
        <el-dialog title="添加土地" width="40%" :visible.sync="addVisible">
            <el-form :model="form" label-width="80px" :rules="rules" ref="form">
                <el-form-item label="土地名称" prop="landName">
                    <el-input
                        v-model="form.landName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="土地介绍" prop="landDesc">
                    <el-input
                        v-model="form.landDesc"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="土地地址" prop="landAddress">
                    <el-input
                        v-model="form.landAddress"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="土地面积" prop="landArea">
                    <el-input
                        v-model="form.landArea"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="目标金额" prop="targetAmount">
                    <el-input
                        v-model="form.targetAmount"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <!-- 上传封面Dialog -->
        <el-dialog
            title="上传土地封面图片"
            width="40%"
            :visible.sync="uploadCoverImgVisible"
        >
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="uploadCoverImgVisible = false"
                    >放 弃</el-button
                >
                <el-button type="primary" @click="uploadCoverImgVisible = false"
                    >上 传</el-button
                >
            </div>
        </el-dialog>
        <!-- 土地头部 -->
        <div class="land-nav">
            <div class="land-nav-btn">
                <el-button
                    @click="handleAdd"
                    class="btn-add"
                    type="primary"
                    size="medium"
                    plain
                    >添加土地</el-button
                >
                <el-select
                    label="状态筛选"
                    class="btn-status"
                    size="medium"
                    v-model="status"
                    @change="getLandList"
                    placeholder="请选择状态"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.desc"
                        :value="item.code"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="land-nav-searvh">
                <el-input
                    size="medium"
                    style="width: 300px"
                    placeholder="请输入内容"
                    v-model="landName"
                    class="input-with-select"
                >
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searchLand()"
                    ></el-button>
                </el-input>
            </div>
        </div>
        <!-- 土地列表 -->
        <el-table
            :data="landList"
            header-align="center"
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column label="名称" prop="landName"></el-table-column>
            <el-table-column label="描述" prop="landDesc"></el-table-column>
            <el-table-column
                label="面积"
                prop="landArea"
                width="80"
            ></el-table-column>
            <el-table-column
                label="目标金额"
                prop="targetAmount"
                width="100"
            ></el-table-column>
            <el-table-column
                label="当前金额"
                prop="currentAmount"
                width="100"
            ></el-table-column>
            <el-table-column
                label="进度(%)"
                width="80"
                prop="progress"
            ></el-table-column>
            <el-table-column label="状态" width="80" prop="status">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 1" type="success"
                        >进行中</el-tag
                    >
                    <el-tag v-if="scope.row.status == 0" type="danger"
                        >未发布</el-tag
                    >
                    <el-tag v-if="scope.row.status == 2" type="info"
                        >已结束</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        v-if="scope.row.status == 0"
                        size="mini"
                        @click="updateLandStatus(scope.row.landId, 1)"
                        >发布</el-button
                    >
                    <el-button
                        type="text"
                        v-if="scope.row.status == 1"
                        size="mini"
                        @click="updateLandStatus(scope.row.landId, 0)"
                        >结束</el-button
                    >
                    <el-button
                        type="text"
                        size="mini"
                        @click="handleOptions(scope.row.landId)"
                        >选项</el-button
                    >
                    <el-button
                        type="text"
                        size="mini"
                        @click="handleDelete(scope.row.landId)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            v-on:currentPage="getCurrentPage"
            v-on:pageSize="getPageSize"
            :total="total"
        ></Pagination>
    </div>
</template>

<script>
import {
    listLands,
    saveLand,
    deleteLand,
    searchLand,
    updateLandStatus,
} from "../api/landApi";
import Pagination from "../components/Pagination";
export default {
    name: "Land",
    components: {
        Pagination,
    },
    data() {
        return {
            uploadCoverImgVisible: false,
            addVisible: false,
            loading: false,
            status: null,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            form: {},
            landName: "",
            imageUrl: "",
            landList: [],
            options: [
                {
                    code: 0,
                    desc: "未发布",
                },
                {
                    code: 1,
                    desc: "进行中",
                },
                {
                    code: 2,
                    desc: "已结束",
                },
                {
                    code: null,
                    desc: "全部",
                },
            ],
            rules: {
                landName: [
                    {
                        required: true,
                        message: "请输入土地名称",
                        trigger: "blur",
                    },
                ],
                landDesc: [
                    {
                        required: true,
                        message: "请输入土地介绍",
                        trigger: "blur",
                    },
                ],
                landAddress: [
                    {
                        required: true,
                        message: "请输入土地地址",
                        trigger: "blur",
                    },
                ],
                landArea: [
                    {
                        required: true,
                        message: "请输入土地面积",
                        trigger: "blur",
                    },
                ],
                targetAmount: [
                    {
                        required: true,
                        message: "请输入目标金额",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    created() {
        this.getLandList();
    },
    methods: {
        handleOptions(landId) {
            console.log(landId);
            this.$router.push("/land/option");
        },
        updateLandStatus(landId, status) {
            updateLandStatus(landId, status).then((res) => {
                if (res.data.code == 200) {
                    this.getLandList();
                    if (status == 1) {
                        this.$notify.success("发布成功");
                    } else if (status == 0) {
                        this.$notify.success("土地众筹结束");
                    }
                } else {
                    this.$notify.error(
                        res.data.msg + "(" + res.data.code + ")"
                    );
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
            }
            return isJPG && isLt5M;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    saveLand(this.form).then((res) => {
                        if (res.data.code == 200) {
                            this.$notify.success("添加成功");
                            this.handleCancel(formName);
                            this.uploadCoverImgVisible = true;
                        } else {
                            this.$notify.error(
                                res.data.msg + " (" + res.data.code + ")"
                            );
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleCancel(formName) {
            this.resetForm(formName);
            this.addVisible = false;
        },
        handleAdd() {
            this.addVisible = true;
            // this.uploadCoverImgVisible = true;
        },
        getLandList() {
            let userId = 1;
            listLands(
                this.currentPage,
                this.pageSize,
                userId,
                this.status
            ).then((res) => {
                if (res.data.code == 200) {
                    this.landList = res.data.data.records;
                    this.total = res.data.data.total;
                }
            });
        },
        searchLand() {
            searchLand(this.currentPage, this.pageSize, this.landName).then(
                (res) => {
                    if (res.data.code == 200) {
                        this.landList = res.data.data.records;
                        this.total = res.data.data.total;
                    }
                }
            );
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(landId) {
            this.$confirm("确认删除？", "提示", {
                distinguishCancelAndClose: true,
                confirmButtonText: "删除",
                cancelButtonText: "放弃",
            })
                .then(() => {
                    deleteLand(landId).then((res) => {
                        if (res.data.code == 200) {
                            this.$notify.success("删除成功");
                            this.getLandList();
                        } else {
                            this.$notify.error(
                                res.data.msg + " (" + res.data.code + ")"
                            );
                        }
                    });
                })
                .catch((action) => {});
        },
        getCurrentPage(currentPage) {
            this.currentPage = currentPage;
            this.getLandList();
        },
        getPageSize(pageSize) {
            this.pageSize = pageSize;
            this.getLandList();
        },
    },
};
</script>
<style lang="less">
.land {
    &-nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        &-btn {
            .btn-add {
                margin-right: 10px;
            }
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .el-icon-plus {
        line-height: 200px;
    }
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 200px;
    line-height: 200px;
    text-align: center;
}
.avatar {
    width: 300px;
    height: 200px;
    display: block;
}
</style>