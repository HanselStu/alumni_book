<template>
    <div>
        <el-page-header @back="goBack" content="我的同学录">
        </el-page-header>

        <el-collapse v-model="activeName" :accordion="true" v-if="data.length > 0">
            <el-collapse-item v-for="item in data" :key="item.id" :name="item.id">
                <span slot="title" style="padding-left: 40px;font-weight: bold;">To：{{ item.name }}
                    <span style="padding-left: 216px">Time：{{ item.time }}</span>
                </span>
                <el-descriptions :colon="false" style="padding-left: 40px;" :labelStyle="{ 'font-size': '14px' }"
                    :contentStyle="{ 'font-size': '14px' }">
                    <el-descriptions-item label="姓名：">{{ item.name }}</el-descriptions-item>
                    <el-descriptions-item label="口头禅：">{{ item.phrase }}</el-descriptions-item>
                    <el-descriptions-item label="爱好：">{{ item.hobby }}</el-descriptions-item>
                    <el-descriptions-item label="喜欢的颜色：">{{ item.color }}</el-descriptions-item>
                    <el-descriptions-item label="喜欢的食物：">{{ item.food }}</el-descriptions-item>
                    <el-descriptions-item :span="4"></el-descriptions-item>
                    <el-descriptions-item label="Ta眼中的我：">{{ item.mine }}</el-descriptions-item>
                    <el-descriptions-item :span="4"></el-descriptions-item>
                    <el-descriptions-item label="Ta对我说：">{{ item.content }}</el-descriptions-item>
                </el-descriptions>
            </el-collapse-item>
        </el-collapse>

        <div v-else style="width: 100%;">
            <el-empty :image-size="300" image="https://s1.hdslb.com/bfs/static/jinkela/space/assets/nodata02.png">
                <template slot="description">
                    <span style="font-size: 18px;color: skyblue;">你暂时还没有写过同学录哦~</span>
                </template>
            </el-empty>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MyMetaBook',
    data () {
        return {
            activeName: '1',
            data: []
        };
    },
    methods: {
        // 返回上一页
        goBack () {
            this.$router.push({ name: 'main' })
        }
    },
    mounted () {
        // 获取已写同学录列表
        axios.get('/api/book/finished.php?uid=' + this.UserId).then(res => {
            this.data = res.data.data
        })
    },
    computed: {
        UserId () {
            return JSON.parse(sessionStorage.getItem('user')).id
        }
    }
}
</script>

<style>
.el-collapse-item__header {
    font-size: 18px;
    color: skyblue;
    width: 100%;
}
</style>