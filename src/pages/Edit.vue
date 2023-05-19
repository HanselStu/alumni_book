<template>
    <div>
        <el-dialog center width="550px" top="8%" style="overflow-y: hidden;" :visible.sync="dialogFormVisible">
            <template slot="title">
                <el-divider content-position="left">
                    <span style="line-height: 40px;font-size: 20px;">编辑个人信息</span>
                </el-divider>
            </template>
            <el-form :model="form" ref="form" class="form" :rules="rules">
                <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
                    <el-select v-model="form.sex" placeholder="请选择你的性别~" class="inputWidth">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="tel" label="电话号码" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" autocomplete="off" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item prop="psw" label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.psw" show-password autocomplete="off" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPsw" label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="form.confirmPsw" show-password autocomplete="off" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="上传头像" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" action="/api/book/upload.php" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn cancel" @click="cancel">取 消</el-button>
                <el-button class="btn confirm" type="primary" @click="confirmEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Edit',
    computed: {
        // 返回当前登录用户对象
        loginUser () {
            return JSON.parse(sessionStorage.getItem('user'))
        }
    },
    data () {
        // 自定义校验规则 检查两次密码是否一致
        var confirmPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码哦~'));
            } else if (value !== this.form.psw) {
                callback(new Error('两次输入密码不一致哦~'));
            } else {
                callback();
            }
        }

        return {
            // 头像的url
            imageUrl: '',
            // 控制弹窗的显示与隐藏
            dialogFormVisible: false,
            // 表单label的宽度
            formLabelWidth: '80px',
            // 表单数据
            form: {
                id: '',
                name: '',
                sex: '',
                tel: '',
                psw: '',
                confirmPsw: '',
                avatar: ''
            },
            rules: {
                // 这些规则是根据表单数据的属性来写的 即prop的值要和表单的属性名一致
                name: [
                    { required: true, message: '请输入你的姓名哦~', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符哦~', trigger: 'blur' }
                ],
                psw: [
                    { required: true, message: '请输入你的密码哦~', trigger: 'blur' },
                    { min: 1, max: 14, message: '长度在 1 到 14 个字符哦~', trigger: 'blur' }
                ],
                confirmPsw: [
                    { required: true, validator: confirmPwd, trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择你的性别哦~', trigger: 'change' }
                ],
                tel: [
                    { required: true, message: '请输入你的电话号码哦~', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度为 11 个字符哦~', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 确认编辑
        confirmEdit () {
            this.$refs.form.validate((valid) => {
                if (!valid) return
                // 发送请求
                delete this.form.confirmPsw
                axios.post('/api/book/user.php', this.form).then(res => {
                    console.log(res.data)
                    if (res.data.resultCode === 200) {
                        this.$message({
                            message: '编辑成功~',
                            type: 'success',
                            duration: 1500
                        })
                        // 更新sessionStorage中的用户信息
                        this.$store.state.avatarUrl = this.form.avatar
                        sessionStorage.setItem('user', JSON.stringify(this.form))
                        // 关闭弹窗
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            });
        },
        // 取消编辑
        cancel () {
            this.dialogFormVisible = false
        },
        // 上传头像成功
        handleAvatarSuccess (res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.form.avatar = res.data
        },
        // 上传头像之前的校验
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    watch: {
        // 监听弹窗的显示与隐藏
        dialogFormVisible (val) {
            if (!val) {
                this.$router.push("/main")
            }
        }
    },
    mounted () {
        let user = this.loginUser
        this.form.id = user.id
        this.form.name = user.name
        this.form.cid = user.cid
        this.form.sex = user.sex
        this.form.tel = user.tel
        this.form.psw = user.psw
        this.form.confirmPsw = user.psw
        this.imageUrl = user.avatar
        this.form.avatar = user.avatar
        this.dialogFormVisible = this.$route.params.digFormVisible
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

.avatar {
    width: 60px;
    height: 60px;
    display: block;
}

.inputWidth {
    width: 270px;
}

.form {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
}

.el-dialog__header {
    height: 50px;
}

.el-dialog__body {
    padding-top: 0px;
}

.el-divider__text {
    line-height: 15px;
}

.el-dialog__footer {
    height: 90px;
}

.btn {
    width: 100px;
    height: 40px;
    position: absolute;
    bottom: 5%;
}

.cancel {
    left: 140px;
}

.confirm {
    right: 140px;
}
</style>