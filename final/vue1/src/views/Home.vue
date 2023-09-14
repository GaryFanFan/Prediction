<script>
export default {

  methods:{
    knnpush() {
      this.$router.push({path:"/knnpush"})
    },

    knndp() {
      this.$router.push({path:"/knndp"})
    },

    lrpush() {
      this.$router.push({path:"/lrpush"})
    },

    lrdp() {
      this.$router.push({path:"/lrdp"})
    },
  },

}

</script>



<template>

  <el-row :gutter="20">
    <el-col :span="12" :offset="6"><div style="text-align: center;font-size: xx-large;padding: 20px;color: rgba(17,68,96,0.8);"><b><span>软件缺陷预测模型</span></b></div></el-col>
  </el-row>

  <el-row :gutter="20" >
    <el-col :span="8"></el-col>

    <el-col :span="4" style="padding: 20px">
      <div style="margin: 20px 20px">
        <a @click="knnpush" class="btn" ><b><span>KNN上传文件</span></b></a>
      </div>

      <div style="margin: 20px 20px">
        <a @click="lrpush" class="btn" ><b><span>LR上传文件</span></b></a>
      </div>

    </el-col>

    <el-col :span="4" style="padding: 20px">
      <div style="margin: 20px 20px">
        <a @click="knndp" class="btn" ><b><span>KNN预测结果</span></b></a>
      </div>

      <div style="margin: 20px 20px">
        <a @click="lrdp" class="btn" ><b><span>LR预测结果</span></b></a>
      </div>
    </el-col>

    <el-col :span="8"></el-col>
  </el-row>

</template>

<style>

.btn{
  display:flex;
  text-align:center;
  font-size: 25px;
  width: 30vh;
  height: 25vh;
  position: relative;
  padding: 25px 25px;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  background-image: linear-gradient(rgb(255, 255, 255), rgb(253, 253, 254));
  color: #000;
  text-decoration: none;
  border-radius: 5px;
  transition: .5s;
  overflow: hidden;
}

.btn:hover{
  color: #fff;
}

.btn::before{
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

.btn:hover::before{
  width: 1000px;
  height: 1000px;
}

.btn span{
  position: relative;
  z-index: 1;

}


</style>