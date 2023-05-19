<template>
    <div>
        <el-page-header @back="goBack" content="班级通讯录">
        </el-page-header>
        <el-table :data="tableData" style="width: 100%;font-size: 16px;overflow-y: hidden;border: none;"
            :header-cell-style="{ background: '#7ccff2', color: 'white', 'font-weight': '800', 'line-hight': '50px', 'text-align': 'center', 'border': 'none' }"
            :cell-style="{ 'text-align': 'center', 'border': '1px solid #fff', 'border-spacing': '0', 'height': '80px' }"
            :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="avatar" label="头像" width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" style="width: 40px;height: 40px;border-radius: 50%;">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="100">
            </el-table-column>
            <el-table-column prop="tel" label="联系方式" width="180">
            </el-table-column>
            <el-table-column label="操作" width="290">
                <template #default="scope">
                    <el-button type="success" plain style="font-size: 14px;width: 120px;"
                        @click="invite(scope.row.id)">邀请Ta写同学录</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ClassBook',
    data () {
        return {
            // 表格数据
            tableData: [],
            loading: true
        };
    },
    methods: {
        // 表格行的类名的回调方法，也可以使用字符串为某一行绑定特定的类名
        tableRowClassName ({ row, rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        // 返回上一页
        goBack () {
            this.$router.push({ name: 'main' })
        },
        // 邀请Ta写同学录
        invite (id) {
            // 判断是否邀请自己
            if (id === this.UserId) {
                this.$message({
                    type: 'warning',
                    message: '不能邀请自己写同学录！'
                })
                return
            }

            // 发送请求的数据
            let data = {
                tid: id,
                fid: this.UserId
            }
            axios.post('/api/book/invite.php', data).then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '邀请成功！'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '邀请失败！'
                    })
                }
            })
        }
    },
    mounted () {
        // 获取班级通讯录数据
        axios.get('/api//book/students.php?cid=' + this.UserCid).then(res => {
            this.tableData = res.data.data
        })
    },
    computed: {
        // 返回当前登录用户对象班级id
        UserCid () {
            return JSON.parse(sessionStorage.getItem('user')).cid
        },
        UserId () {
            return JSON.parse(sessionStorage.getItem('user')).id
        }
    }
}
</script>

<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #ebf3f9;
}

.el-page-header {
    background-color: #f5f7fa;
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    flex-wrap: wrap;
    min-height: 40px;
    font-size: 16px;
    line-height: 22px;
    color: #303133;
    font-weight: 500;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
}
</style>