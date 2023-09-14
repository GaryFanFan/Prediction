<template>

  <el-row :gutter="20">
    <el-col :span="6">
      <div style="margin: 20px 20px">
        <a @click="back" class="back" ><b><span>返回</span></b></a>
      </div>
    </el-col>
    <el-col :span="12" ><div style="text-align: center;font-size: xx-large;padding: 20px;color: rgba(17,68,96,0.8);"><b><span>LR上传文件</span></b></div></el-col>
  </el-row>

  <div class="app-container"  style="padding: 20px">

    <div style="text-align: center;padding: 20px">
      <el-upload action="http://localhost:9090/files/upload/LRtrain" :on-success="filesUploadSuccess">
        <el-button size="large" type="primary" plain>上传训练集</el-button>
      </el-upload>
    </div>

    <div style="text-align: center;padding: 20px">
      <el-upload action="http://localhost:9090/files/upload/LRtest" :on-success="filesUploadSuccess">
        <el-button size="large" type="primary" plain>上传测试集</el-button>
      </el-upload>
    </div>

    <div style="padding: 20px">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    </div>

    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>


  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [] 
    }
  },
  methods: {
    filesUploadSuccess(res){
       console.log(res)
    },
    // 文件上传
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    back() {
      this.$router.push({path:"/home"})
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
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