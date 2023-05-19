<template>
    <div>
        <el-page-header @back="goBack">
            <template slot="content">
                <span>To {{ to.fname }}</span>
            </template>
        </el-page-header>
        <div id="main">
            <div id="leftBox">
                <el-form>
                    <el-row>
                        <el-col>
                            <el-form-item label="你的姓名" style="margin-bottom: 10px;"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-input v-model="FormData.name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="你的爱好" style="margin-bottom: 10px;"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-input v-model="FormData.hobby"></el-input>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div id="rightBox">
                <el-form>
                    <el-row>
                        <el-col>
                            <el-form-item label="你的口头禅" style="margin-bottom: 10px;"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-input v-model="FormData.phrase"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="最爱的颜色" style="margin-bottom: 10px;"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-input v-model="FormData.color"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="最爱的食物" style="margin-bottom: 10px;"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-input v-model="FormData.food"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="在你眼中我的样子" style="margin-bottom: 10px;"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-input v-model="FormData.mine"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="你想对我说" style="margin-bottom: 10px;"></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-input type="textarea" v-model="FormData.content"></el-input>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <span id="btn">
            <el-button size="medium" type="primary" @click="onSubmit" style="margin-right: 20px;">立即提交</el-button>
            <el-button size="medium" type="primary" @click="reWrite">重新书写</el-button>
        </span>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ToBook',
    data () {
        return {
            id: this.$route.params.id,
            fname: this.$route.params.fname,
            FormData: {
                id: '',
                name: '',
                hobby: '',
                color: '',
                food: '',
                phrase: '',
                mine: '',
                content: '',
            }
        }
    },
    methods: {
        // 提交表单
        onSubmit () {
            this.FormData.id = this.to.id
            axios.post('/api/book/addinvite.php', this.FormData).then(res => {
                if (res.data.resultCode === 200) {
                    this.$message({
                        type: 'success',
                        message: '提交成功！'
                    })
                    this.$router.push({ name: 'writeBook' })
                } else {
                    this.$message({
                        type: 'error',
                        message: '提交失败！'
                    })
                }
            })
        },
        // 重新书写
        reWrite () {
            this.FormData.name = '';
            this.FormData.hobby = '';
            this.FormData.color = '';
            this.FormData.food = '';
            this.FormData.phrase = '';
            this.FormData.mine = '';
            this.FormData.content = '';
        },
        // 返回上一页
        goBack () {
            this.$router.go(-1)
        }
    },
    beforeRouteLeave (to, from, next) {
        // 离开页面时清除sessionStorage
        sessionStorage.removeItem('writeTo')
        next();
    },
    computed: {
        to () {
            return JSON.parse(sessionStorage.getItem('writeTo'))
        }
    }
}
</script>

<style scoped>
#main {
    width: 100%;
    height: 100%;
    margin-top: 20px;
}

#btn {
    float: right;
    margin-top: 40px;
    margin-right: 39%;
}

.el-form-item__label {
    float: none;
    word-break: break-word;
}

#leftBox {
    float: left;
    width: 48%;
    height: 100%;
    opacity: 0.7;
    border-radius: 5px;
    padding: 25px;
}

#rightBox {
    float: right;
    width: 48%;
    height: 100%;
    opacity: 0.7;
    border-radius: 5px;
    padding: 25px;

}
</style>