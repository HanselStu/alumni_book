<template>
    <div>
        <el-container>
            <!-- 导航条 -->
            <el-header :style="{ padding: '0px', margin: '0px' }">
                <div class="menu-wrapper">
                    <div id="logo">LOGO</div>
                    <el-menu class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect"
                        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="/main/classBook">班级通信录</el-menu-item>
                        <el-submenu index="mateBook">
                            <template slot="title">毕业同学录</template>
                            <el-menu-item index="/main/myBook">我的同学录</el-menu-item>
                            <el-menu-item index="/main/writeBook">待写同学录</el-menu-item>
                            <el-menu-item index="/main/writedBook">已写同学录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="personal">
                            <template slot="title">个人中心</template>
                            <el-menu-item index="update" @click="update">
                                <span>修改信息</span>
                                <span style="float: right;"><img :src="avatarUrl" width="30px"
                                        style="border-radius: 50%;" /></span>
                            </el-menu-item>
                            <el-menu-item index="logout" @click="logout">退出登录</el-menu-item>
                        </el-submenu>

                    </el-menu>
                </div>
            </el-header>

            <el-main>
                <img src="http://43.136.245.157/img/bg.4c4268d4.jpg" id="bg_img" alt="" />
                <div id="content">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data () {
        return {

        };
    },
    methods: {
        // 菜单栏选中事件
        handleSelect (key, keyPath) {
            
        },
        // 修改信息
        update () {
            this.$router.push({
                name: 'edit',
                params: { digFormVisible: true }
            })
        },
        // 退出登录
        logout () {
            this.$confirm('是否退出登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('user')
                this.$router.push('login')
                this.$message({
                    type: 'success',
                    message: '注销成功',
                    duration: 1000
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消注销',
                    duration: 1000
                });
            });
        },
    },
    computed: {
        // 返回当前登录用户对象的头像地址
        avatarUrl () {
            return this.$store.state.avatarUrl
        },
    },
    mounted () {
        this.$store.state.avatarUrl = JSON.parse(sessionStorage.getItem('user')).avatar
    }
}
</script>

<style scoped>
.el-main {
    overflow: hidden;
}

#content {
    width: 1000px;
    margin: 0 auto;
}

#logo {
    width: 50px;
    height: 60px;
    font-size: 25px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    padding: 0 20px;
    background-color: rgb(84, 92, 100);
    z-index: 1;
}

#bg_img {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: .3;
    min-height: 100%;
}

.menu-wrapper {
    display: flex;
    justify-content: flex-end;
}

/* 右到左排列 */
.el-menu-item,
.el-submenu__title {
    margin-right: 20px;
}

.menu-list {
    display: flex;
    flex-direction: row-reverse;
}

.el-menu {
    width: 100%;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    max-width: unset;
    /* 禁用最大宽度，保证菜单可以水平滚动 */
    overflow-x: hidden;
    /* 菜单超出部分横向滚动 */
}

/* 将菜单项右对齐 */
.el-menu-item {
    margin-left: auto;
}

/* 设置子选项面板大小 */
.el-submenu__popper {
    width: 50px !important;
}
</style>