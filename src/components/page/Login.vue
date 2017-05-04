<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
                    <div class="selectrole" id="selectrole">
                        <h3>请选择一个登录角色</h3>
                        <ul>
                            <li :class="{'maindoc':item.roleId=='main_doctor','choicdoc':item.roleId=='chronic_doctor','healthdoc':item.roleId=='health_doctor'}" @click="getroleId(item)" v-for="(item,index) in role_list">
                                <p></p>
                                <p>{{item.roleName}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>
<script>
import {
    requestrolelist, requestLoginon
}
from '../../api/api';
import md5 from 'md5';
// var md5 = require("md5");
export default {
    data: function() {
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            role_list: [],
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            },
            fullscreenLoading: false
        }
    },
    methods: {
        submitForm(formName) {
                const that = this;
                this.fullscreenLoading = true;
                let loginParams = {
                    uid: this.ruleForm.username,
                    pwd: md5(this.ruleForm.password),
                    forAccessToken: true
                }
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        requestrolelist(loginParams).then(res => {
                            that.role_list = res.data.body.filter(item =>  item.roleId != "patient");
                            let temopt = {
                                tenantId: 'coms.xiangtan',
                                uid: loginParams.uid,
                                roleId: "",
                                pwd: loginParams.pwd,
                                forAccessToken: true
                            };
                            if (that.role_list.length == 1) {
                                temopt.roleId = that.role_list[0].roleId;
                                requestLoginon(temopt).then((res) => {
                                    that.$router.push('/readme');
                                    sessionStorage.setItem('accessToken', res.data.properties.accessToken);
                                    sessionStorage.setItem('roleId', res.data.body.roleId);
                                    sessionStorage.setItem('userName', res.data.body.userName);
                                    that.fullscreenLoading = false;
                                })

                            } else {
                                that.fullscreenLoading = false;
                                document.getElementById("selectrole").style.display = "block"
                            }

                            // let {
                            //     msg, code, user
                            // } = data;
                            // if (code !== 200) {
                            //     this.$notify({
                            //         title: '错误',
                            //         message: msg,
                            //         type: 'error'
                            //     });
                            // } else {
                            //     sessionStorage.setItem('user', JSON.stringify(user));
                            //     this.$router.push({
                            //         path: '/table'
                            //     });
                            // }
                            // that.$router.push('/readme');
                        });
                        // localStorage.setItem('ms_username',that.ruleForm.username);

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getroleId(item) {
                var that = this;
                let loginParams = {
                    uid: this.ruleForm.username,
                    pwd: md5(this.ruleForm.password),
                    forAccessToken: true
                }
                this.fullscreenLoading = true;
                requestrolelist(loginParams).then(res => {

                    that.role_list = res.data.body.filter(el => el.roleId != "patient");
                    let temopt = {
                        tenantId: 'coms.xiangtan',
                        uid: loginParams.uid,
                        roleId: "",
                        pwd: loginParams.pwd,
                        forAccessToken: true
                    };

                    temopt.roleId = item.roleId;
                    requestLoginon(temopt).then((res) => {
                        that.fullscreenLoading = false;
                        that.$router.push('/readme');
                        sessionStorage.setItem('accessToken', res.data.properties.accessToken);
                        sessionStorage.setItem('userName', res.data.body.userName);
                        sessionStorage.setItem('roleId', item.roleId);

                    })


                });
            }
    }
}
</script>
<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn {
    text-align: center;
    position: relative;
}

.login-btn button {
    width: 100%;
    height: 36px;
}

.selectrole {
    width: 300px;
    height: 240px;
    position: absolute;
    top: -157px;
    left: -344px;
    border-radius: 5px 0 0 5px;
    /*  box-shadow: 0 0 8px #ddd;*/
    z-index: 99;
    background: rgba(29, 196, 153, 0.8);
    display: none;
}

.selectrole h3 {
    color: #fff;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: normal;
}

.selectrole ul {
    width: 270px;
    margin: 0 auto;
}

.selectrole ul li {
    padding: 10px 0 10px;
    width: 80px;
    height: 120px;
    float: left;
    color: #fff;
    margin-left: 10px;
    border-radius: 5px;
}

.selectrole ul li p {
    line-height: 30px;
    height: 30px;
    text-align: center;
}

.selectrole ul li.maindoc p:nth-child(1) {
    height: 80px;
    background: url(../../../static/img/maindoc.png) no-repeat center center;
}

.selectrole ul li.choicdoc p:nth-child(1) {
    height: 80px;
    background: url(../../../static/img/choicdoc.png) no-repeat center center;
}

.selectrole ul li.healthdoc p:nth-child(1) {
    height: 80px;
    background: url(../../../static/img/healthdoc.png) no-repeat center center;
}

.selectrole ul li:hover {
    background: rgba(255, 255, 255, 0.7);
    color: #0677eb
}
</style>
