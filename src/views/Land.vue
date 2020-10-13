<template>
    <div class="land">
        <div class="land-nav">
            <div class="land-nav-btn">
                <el-button class="btn-add" type="primary" size="medium" plain
                    >添加土地</el-button
                >
                <el-select label="状态筛选" class="btn-status" size="medium" v-model="status" placeholder="请选择状态">
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
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
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
                label="进度"
                width="60"
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
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
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
import { listLands } from "../api/landApi";
import Pagination from "../components/Pagination";
export default {
    name: "Land",
    components: {
        Pagination,
    },
    data() {
        return {
            loading: false,
            status: 1,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            landName: "",
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
            ],
        };
    },
    created() {
        this.getLandList();
    },
    methods: {
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
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        getCurrentPage(currentPage) {
            this.currentPage = currentPage;
        },
        getPageSize(pageSize) {
            this.pageSize = pageSize;
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
</style>