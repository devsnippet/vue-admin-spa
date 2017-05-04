<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
            <el-table-column prop="personame" label="姓名" sortable>
            </el-table-column>
            <el-table-column prop="levelText" label="职称">
            </el-table-column>
            <el-table-column prop="phoneNo" label="手机" :formatter="formatter">
            </el-table-column>
            <!-- <el-table-column prop="serviceProviderTypeText" label="标签" width="120" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag">
                <template scope="scope">
                    <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10,20,50]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="params.pageSize">
            </el-pagination>
        </div>
        <el-dialog title="收货地址" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    commonAjax
}
from '../../api/api';
export default {
    data() {
            return {
                listLoading: false,
                tableData: [],
                params: {
                    content: "",
                    pageNo: 1,
                    pageSize: 10,
                },
                total: "",
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'

            }
        },
        methods: {
            formatter(row, column) {
                    return row.phoneNo;
                },
                // filterTag(value, row) {
                //     return row.tag === value;
                // },
                handleEdit(index, row) {
                    this.dialogFormVisible = true;
                    // this.$message('编辑第' + (index + 1) + '行');
                },
                handleDelete(index, row) {
                    this.$message.error('删除第' + (index + 1) + '行');
                },
                getTableData() {
                    this.listLoading = true;
                    let params = this.params;
                    commonAjax('[' + JSON.stringify(params) + ']', "coms.servicePersonService", "queryServicePersonList").then(res => {
                        this.listLoading = false;
                        this.tableData = res.body.list;
                        this.total = res.body.total
                    });
                },
                handleSizeChange(val) {
                    this.params.pageSize = val;
                    this.getTableData()
                },
                handleCurrentChange(val) {
                    this.params.pageNo = val;
                    this.getTableData()
                }
        },
        beforeMount() {
            this.getTableData()

        }
}
</script>
