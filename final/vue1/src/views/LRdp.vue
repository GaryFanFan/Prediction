<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div style="margin: 20px 20px">
        <a @click="back" class="back" ><b><span>返回</span></b></a>
      </div>
    </el-col>
    <el-col :span="12" ><div style="text-align: center;font-size: xx-large;padding: 20px;color: rgba(17,68,96,0.8);"><b><span>LR预测结果</span></b></div></el-col>
  </el-row>

  <div style="padding: 20px;">
    <!--    搜索区域-->
    <div style="padding: 10px">
      <el-input size="medium" v-model="search" placeholder="请输入查询ID" style="width: 20%" clearable></el-input>
      <el-button size="medium" type="primary" style="margin-left: 5px" @click="load" plain>查询</el-button>
    </div>

    <div style="padding: 10px">
    <el-table
        size="medium"
        v-loading="loading"
        :data="tableData"
        border
        stripe

    >
      <el-table-column
          width="70"
          prop="id"
          label="ID"
          sortable
      >
      </el-table-column>
      <el-table-column
          width="150"
          prop="name"
          label="训练集总量">
      </el-table-column>
   
      <el-table-column
          prop="totalPrice"
          label="测试集总量">
      </el-table-column>
      <el-table-column
          prop="payPrice"
          label="测试集预测正确数量">
      </el-table-column>
      <el-table-column
          prop="discount"
          label="测试集预测错误数量">
      </el-table-column>
      <el-table-column
          prop="transportPrice"
          label="准确率">
      </el-table-column>

      <el-table-column
          width="50"
          prop="tp"
          label="tp">
      </el-table-column>
      <el-table-column
          width="50"
          prop="tn"
          label="tn">
      </el-table-column>
      <el-table-column
          width="50"
          prop="fp"
          label="fp">
      </el-table-column>
      <el-table-column
          width="50"
          prop="fn"
          label="fn">
      </el-table-column>

      <el-table-column label="操作" >
        <template #default="scope">
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="medium" type="danger" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <div style="padding: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  name: 'Order',
  components: {

  },
  data() {
    return {
      user: {},
      loading: true,
      form: {},
      dialogVisible: false,
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    }
  },
  created() {
    let userStr = sessionStorage.getItem("user") || "{}"
    this.user = JSON.parse(userStr)
    // 请求服务端，确认当前登录用户的 合法信息
    request.get("/user/" + this.user.id).then(res => {
      if (res.code === '0') {
        this.user = res.data
      }
    })

    this.load()
  },
  methods: {
    load() {
      this.loading = true
      request.get("/order", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        this.loading = false
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    add() {
      this.dialogVisible = true
      this.form = {}
      if (this.$refs['upload']) {
        this.$refs['upload'].clearFiles()  // 清除历史文件列表
      }
    },
    save() {
      if (this.form.id) {  // 更新
        request.put("/order", this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load() // 刷新表格的数据
          this.dialogVisible = false  // 关闭弹窗
        })
      }  else {  // 新增
        request.post("/order", this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }

          this.load() // 刷新表格的数据
          this.dialogVisible = false  // 关闭弹窗
        })
      }
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      this.$nextTick(() => {
        if (this.$refs['upload']) {
          this.$refs['upload'].clearFiles()  // 清除历史文件列表
        }
      })

    },
    handleDelete(id) {
      console.log(id)
      request.delete("/order/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()  // 删除之后重新加载表格的数据
      })
    },
    handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    back() {
      this.$router.push({path:"/home"})
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum
      this.load()
    }
  }
}
</script>

<style>
.back{
  display:flex;
  text-align:center;
  font-size: large;
  width: 7vh;
  height: 4vh;
  position: relative;
  padding: 5px 10px;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  background-image: linear-gradient(rgb(255, 255, 255), rgb(253, 253, 254));
  color: #000;
  text-decoration: none;
  border-radius: 5px;
  transition: .5s;
  overflow: hidden;
}

.back:hover{
  color: #fff;
}

.back::before{
  content: "";
  position: absolute;
  left: var(--xPos);
  top: var(--yPos);
  /*left: 50%;*/
  /*top: 50%;*/
  transform: translate(-50%,-50%);
  width: 0px;
  height: 0px;
  background-color: rgba(17, 68, 96, 0.8);
  border-radius: 50%;
  transition: width 0.7s,height 0.7s;
}

.back:hover::before{
  width: 600px;
  height: 600px;
}

.back span{
  position: relative;
  z-index: 1;
}
</style>