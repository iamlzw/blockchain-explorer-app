<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      let self = this
      this.$axios({
        method: 'POST',
        url: this.$global.baseUrl + 'authenticate',
        data: JSON.stringify({'username': this.form.username, 'password': this.form.password}),
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function (response) {
        // 如果后台登陆成功
        if (response.status === 200) {
          localStorage.username = response.data.username
          localStorage.token = response.data.token
          self.$router.push({path: '/main'})
        }
      })
    }
  }
}
</script>

<style scoped>
div{

}
</style>
