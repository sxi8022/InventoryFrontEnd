<template>
    <div>
        <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><h4>로그인 인증 페이지</h4></div>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
        </div>
        <div class="row mt-1 mb-2">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <form v-on:submit.prevent="loginUser">
                <div class="form-group">
                    <label for="userid">사용자ID</label>
                    <input type="text" v-model="userid" id="userid" name="userid" class="form-control" />
                    <small>{{ idValidation }}</small>
                </div>
                <div class="form-group">
                    <label for="password">패스워드</label>
                    <input type="password" v-model="password" id="password" name="password" class="form-control" />
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">로그인</button>
                </div>
              </form>
            </div>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: '로그인',
      userid: '',
      password: '',
      status: '',
      formkey: '',
      tokenKey: ''
    }
  },
  computed: {
    idValidation: function () {
      return this.userid.length > 4 ? '' : '4자 이상 입력해주세요.'
    }
  },
  methods: {
    async loginUser () {
      var strTemp = 'http://localhost:55241/Token'
      // var loginData = {
      //   userId: $('#userid').val(),
      //   passWord: $('#password').val(),
      //   grant_type: 'password'
      // }
      // var loginData = {
      //   username: $('#userid').val(),
      //   password: $('#password').val(),
      //   grant_type: 'password'
      // }
      // var optionAxios = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }
      // await this.axios.post(strTemp, loginData, optionAxios).then(res => {
      //   alert(res.data.state)
      //   // sessionStorage.setItem(this.tokenKey, res.access_token)
      //   return res.data.state
      // }).catch(err => {
      //   console.log(err)
      // })
      // let form = new FormData()
      // form.append('username', 'admin')
      // form.append('password', 'admin')
      // form.append('grant_type', 'password')
      // const qs = require('qs')
      // qs.stringify({ 'username': 'admin', 'password': 'admin', 'grant_type': 'password' }
      this.userid = $('#userid').val()
      this.password = $('#password').val()
      this.axios.post(strTemp, 'username=' + this.userid + '&password=' + this.password + '&grant_type=password', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        alert(JSON.stringify(res.data))
        // sessionStorage.setItem(this.tokenKey, res.access_token)
        if (res.data != null && res.data.tokenKey !== '') {
          this.tokenKey = res.data.access_token
          console.log(this.tokenKey)
        }
        return res.data
      })
    }
  }
}
</script>
