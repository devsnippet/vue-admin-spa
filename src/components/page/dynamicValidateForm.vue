<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>动态增减表单项</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            动态增减表单项
        </div>
        <div class="form-box">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-form-item prop="email" label="邮箱" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },  { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                </el-form-item>
                <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
                    <el-input v-model="domain.value"></el-input>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
                <el-form-item> <el-button @click="addDomain">新增域名</el-button></el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
// 年龄验证

export default {
    data: function() {
        return {
            dynamicValidateForm: {
                domains: [{
                    value: ''
                }],
                email: ''
            }
        }
    },
    methods: {
        submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        console.log(this.dynamicValidateForm)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            }
    },
    mounted() {

    }
}
</script>
<style scoped>
.demo-dynamic .el-input {
    width: 80%;
}
</style>
