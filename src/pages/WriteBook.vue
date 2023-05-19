<template>
  <div>
    <el-page-header @back="goBack" content="待写同学录">
    </el-page-header>

    <el-table :loading="isLoading" v-if="tableData.length > 0" :data="tableData" border style="width: 100%">
      <el-table-column type="index" :index="indexMethod" label="序号" width="180">
      </el-table-column>
      <el-table-column prop="avatar" label="头像" width="260">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width: 40px;height: 40px;border-radius: 5%;">
        </template>
      </el-table-column>
      <el-table-column prop="fname" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="tel" label="联系方式">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="success" plain style="font-size: 14px;width: 150px;"
            @click="write(scope.row)">去写Ta的同学录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else style="width: 100%;">
      <el-empty :image-size="300" image="https://s1.hdslb.com/bfs/static/jinkela/space/assets/nodata02.png">
        <template slot="description">
          <span style="font-size: 18px;color: skyblue;">你暂时还没有待写同学录哦~</span>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'WriteBook',
  data () {
    return {
      tableData: [],
      isLoading: false,
    }
  },
  methods: {
    // 返回序号
    indexMethod (index) {
      return index + 1;
    },
    // 返回上一页
    goBack () {
      this.$router.push({name: 'main'})
    },
    // 去写Ta的同学录
    write (row) {
      const writeTo = {
        id: row.id,
        fname: row.fname
      }
      // 解决刷新后数据丢失问题
      sessionStorage.setItem('writeTo', JSON.stringify(writeTo))
      this.$router.push({name: 'toBook'})
    }
  },
  created () {
    this.isLoading = true;
    // 获取待写同学录列表
    axios.get('/api/book/unfinished.php?uid=' + this.UserId).then(res => {
      this.tableData = res.data.data
      this.isLoading = false;
    })
  },
  computed: {
    UserId () {
      return JSON.parse(sessionStorage.getItem('user')).id
    }
  }
}
</script>

<style></style>