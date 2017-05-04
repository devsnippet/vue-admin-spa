<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。 访问地址：
            <a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div>
        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        <el-button class="editor-btn" type="primary" @click="changeedit">可以编辑</el-button> -->
        <div class="plugins-tips">
            summernote 依赖jquery bootstarp的富文本编辑器
        </div>
        <div id="summernote" class="summernote"></div>
    </div>
</template>
<script>
import {
    imguploadAjax, imgview, getsessionStorage, imguploadurl
}
from '../../api/api';
// import { quillEditor}from 'vue-quill-editor';
import '../../assets/jquery.min';
import '../../assets/bootstrap-3.3.2/css/bootstrap.min.css'
import '../../assets/bootstrap-3.3.2/js/bootstrap.min.js'
import '../../assets/bootstrap-summernote/summernote.css'
import '../../assets/bootstrap-summernote/summernote.js'
export default {
    data: function() {
        return {
            content: '',
            // editorOption: {
            //     debug: 'info',
            //     placeholder: 'Compose an epic...',
            //     theme: 'snow',
            //     imageHandler: imageHandler
            // }
        }
    },
    components: {
        // quillEditor
    },
    methods: {
        // onEditorChange({
        //         editor, html, text
        //     }) {
        //         this.content = html;
        //         alert(111);
        //     },
        //     submit() {
        //         console.log(this.content);
        //         this.$message.success('提交成功！');
        //     },
        //     changeedit() {
        //         this.editor.enable(true);

        //     },
        // imageHandler(image, callback) {
        //     var data = new FormData();
        //     data.append('image', image);
        //     imguploadAjax(data).then(res=>{
        //         console.log(res);
        //         callback(response.data.link);
        //     }).catch(err=>{
        //         console.log(err)
        //     })
        //     // var xhr = new XMLHttpRequest();
        //     // xhr.open('POST', IMGUR_API_URL, true);
        //     // xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
        //     // xhr.onreadystatechange = function() {
        //     //     if (xhr.readyState === 4) {
        //     //         var response = JSON.parse(xhr.responseText);
        //     //         if (response.status === 200 && response.success) {
        //     //             callback(response.data.link);
        //     //         } else {
        //     //             var reader = new FileReader();
        //     //             reader.onload = function(e) {
        //     //                 callback(e.target.result);
        //     //             };
        //     //             reader.readAsDataURL(image);
        //     //         }
        //     //     }
        //     // }
        //     // xhr.send(data);
        // },
    },
    computed: {
        // editor() {
        //     return this.$refs.myTextEditor.quillEditor;
        // }
    },
    mounted() {
        // this.editor.enable(false);

        $('#summernote').summernote({
            height: 300,
            lang: 'zh-CN',
            callbacks: {
                onImageUpload: function(files) {
                    //上传图片到服务器，使用了formData对象，至于兼容性...据说对低版本IE不太友好
                    var formData = new FormData();
                    formData.append('file', files[0]);
                    // formData.append('accessToken', getsessionStorage());
                    // console.log(formData);
                    imguploadAjax(formData).then(res=>{
                         console.log(res)
                         $('#summernote').summernote('insertImage', imgview + res.id, 'img');
                    }).catch(err=>{
                        console.log(err)
                    })
                    // $.ajax({
                    //     headers: {
                    //         "X-Access-Token": getsessionStorage()
                    //     },
                    //     url: imguploadurl, //后台文件上传接口
                    //     type: 'POST',
                    //     data: formData,
                    //     async: true,
                    //     cache: false,
                    //     contentType: false,
                    //     processData: false,
                    //     success: function(res) {
                    //         $('#summernote').summernote('insertImage', imgview + JSON.parse(res).id, 'img');
                    //     }
                    // });

                }
            },
        });
    }
}

// function imageHandler(image, callback) {
//     alert(111);
//     var data = new FormData();
//     data.append('image', image);

//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', IMGUR_API_URL, true);
//     xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//             var response = JSON.parse(xhr.responseText);
//             if (response.status === 200 && response.success) {
//                 callback(response.data.link);
//             } else {
//                 var reader = new FileReader();
//                 reader.onload = function(e) {
//                     callback(e.target.result);
//                 };
//                 reader.readAsDataURL(image);
//             }
//         }
//     }
//     xhr.send(data);
// }
</script>
<style scoped>
.editor-btn {
    margin-top: 20px;
}
</style>
