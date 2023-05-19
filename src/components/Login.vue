<template>
    <div>
        <el-container class="box">
            <el-header>Header</el-header>
            <el-main class="hiddenX">
                <el-form class="form" ref="loginForm" :rules="rules" :label-position="labelPosition" label-width="80px"
                    :model="loginForm">
                    <h1>最好的我们</h1>
                    <el-form-item prop="name" label="姓 名：">
                        <el-input class="inputWidth" v-model="loginForm.name" placeholder="请输入姓名~" maxlength="10"
                            @keyup.enter.native="login"></el-input>
                    </el-form-item>
                    <el-form-item prop="cid" label="班 级：">
                        <el-select class="inputWidth" v-model="loginForm.cid" placeholder="请选择班级~">
                            <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="psw" label="密 码：">
                        <el-input class="inputWidth" v-model="loginForm.psw" placeholder="请输入密码~" maxlength="14"
                            show-password @keyup.enter.native="login"></el-input>
                    </el-form-item>
                    <el-button class="loginBtn" type="primary" size="medium" @click="login">进入同学录~</el-button>
                </el-form>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data () {
        return {
            // 表单对齐方式
            labelPosition: 'right',
            // 表单数据
            loginForm: {
                name: '',
                cid: '',
                psw: ''
            },
            // 班级列表
            classes: [ {
                value: '1',
                label: '软技专本2101'
            }, {
                value: '2',
                label: '软技专本2102'
            }, {
                value: '3',
                label: '软技2102'
            }, {
                value: '4',
                label: '软技2103'
            } ],
            // 表单验证规则
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
                cid: [
                    { required: true, message: '请选择你的班级哦~', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 登录
        login () {
            this.$refs[ 'loginForm' ].validate((checked) => {
                if (!checked) return

                // 表达验证通过
                axios.post('/api/book/login.php', this.loginForm).then(
                    (response) => {
                        this.$message({
                            message: response.data.message,
                            type: 'success',
                            duration: 1000
                        })
                        console.log(response.data)
                        
                        // 用户不存在
                        if (response.data.resultCode === 500) return
                        // 用户存在
                        // 保存用户信息
                        sessionStorage.setItem('user', JSON.stringify(response.data.data));
                        // 跳转到主页
                        setTimeout(() => {
                            this.$router.push("/main");
                        }, 1000);
                    },
                    (error) => {
                        this.$message({
                            message: response.data.message,
                            type: 'error',
                            duration: 1500
                        })
                    }
                )
            })
        }
    }
}
</script>

<style scoped>
.box {
    width: 100%;
    min-width: 400px;
    height: 100vh;
    background-image: url(http://43.136.245.157/img/5_bg.011fb13b.jpg);
    background-size: 100% 100%;
    padding: 1px;
}

.hiddenX {
    overflow-x: hidden;
}

h1 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
    color: #fafafa;

    letter-spacing: 0;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
    /* text-shadow: 0px 1px 0px #f2faff, 0px 2px 0px #e5f5fa, 0px 3px 0px #d9f0fb, 0px 4px 0px #ccedfc, 0px 5px 0px #c0e8fd, 0px 6px 0px #b3e4fe, 0px 7px 0px #a7dffF, 0px 8px 7px #01a2db; */


    /* color: transparent;
    -webkit-text-stroke: 1px black;
    letter-spacing: 0.04em; */

    /* background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
    text-shadow: 3px -3px black, 2px -2px white;
    font-weight: bold;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text; */
}

.inputWidth {
    width: 270px;
}

.loginBtn {
    width: 270px;
    margin-left: 60px;
    margin-top: 12px;
    Letter-spacing: 5px;
}

.form {
    width: 400px;
    height: 320px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-top: 80px;
}
</style>
