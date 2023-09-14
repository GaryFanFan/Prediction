<template>


</template>

<script>
import request from "@/utils/request";
import ValidCode from "@/components/ValidCode";
import {activeRouter} from "@/utils/permission";

export default {
  name: "Login",
  components: {
    ValidCode,
  },
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: '',
      form: {role: 1},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
      validCode: ''

    }
  },
  mounted() {
    sessionStorage.removeItem("user")

    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()


    this.form.username = 'admin'
    this.form.password = 'admin'


    request.post("/user/login", this.form).then(res => {
      if (res.code === '0') {
        // this.$message({
        //   type: "success",
        //   message: "登录成功"
        // })
        console.log(JSON.stringify(res.data))
        sessionStorage.setItem("user", JSON.stringify(res.data))  // 缓存用户信息

        // 登录成功的时候更新当前路由
        activeRouter()
        this.$router.push("/")  //登录成功之后进行页面的跳转，跳转到主页

      } else {
        this.$message({
          type: "error",
          message: res.msg
        })
      }
    })

  },
  methods: {
    canplay() {
      this.vedioCanPlay = true
    },
    // 接收验证码组件提交的 4位验证码
    createValidCode(data) {
      this.validCode = data
      this.form.validCode = this.validCode.toLowerCase()
      this.form.username = 'admin'
      this.form.password = 'admin'
    },
    login () {

    }
  }
}
</script>

<style scoped>
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img{
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  /*background: rgba(0, 0, 0, 0.4);*/
  width: 100%;
}

.fillWidth {
  width: 100%;
}
</style>
