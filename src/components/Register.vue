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
                <el-button type="primary" @click="login">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'Register',
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
      console.log(this.form.username)
      this.$axios({
        method: 'POST',
        url: 'http://localhost:8080/register',
        data: JSON.stringify({'username': this.form.username, 'password': this.form.password}),
        contentType: 'application/json;charset=UTF-8',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
