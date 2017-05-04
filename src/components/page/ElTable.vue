<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>element表格组件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData" border style="width: 100%" empty-text v-loading="listLoading">
            <el-table-column label="日期">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.startDt }}</span>
                </template>
            </el-table-column>
            <el-table-column label="名称">
                <template scope="scope">
                <p>{{ scope.row.serviceName }}</p>
                    <!-- 鼠标放上去提示 -->
                    <!-- <el-popover trigger="hover" placement="top">
                        <p>名称: {{ scope.row.serviceName }}</p>
                        <p>备注: {{ scope.row.remark }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.serviceName }}</el-tag>
                        </div>
                    </el-popover>
                     -->
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {commonAjax}from '../../api/api';
export default {
    data: function() {
        const self = this;
        return {
            tableData: [],
        }
    },
    components: {

    },
    methods: {
        handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
    },
    computed: {

    },
    beforeMount() {
        this.listLoading = true;
        let params =  "[[]]";
        commonAjax(params,"base.baseServiceService","findServiceItemList").then(res => {
           this.listLoading = false;
           this.tableData=res.body;
           

        });

    }
}
</script>
