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
      formkey: ''
    }
  },
  computed: {
    idValidation: function () {
      return this.userid.length > 4 ? '' : '4자 이상 입력해주세요.'
    }
  },
  methods: {
    async loginUser () {
      // ?username=user&password=user&grant_type=password
      var strTemp = 'http://localhost:56433/token'
      // var form = new FormData()
      // form.append('username', this.userid)
      // form.append('password', this.password)
      // form.append('grant_type', 'password')
      this.axios.post(strTemp, 'username=user&password=user&grant_type=password', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        alert(JSON.stringify(res.data))
        // sessionStorage.setItem(this.tokenKey, res.access_token)
        if (res.data != null && res.data.tokenKey !== '') {
          this.tokenKey = res.data.access_token
          this.$cookies.set('user_session', this.tokenKey, 60 * 60)
          // console.log(this.tokenKey)
          console.log(this.$cookies.keys())
        }
        return res.data
      }).catch(res => {
        alert('로그인정보가 잘못되었습니다.')
      })
      // this.axios({
      //   method: 'post',
      //   url: strTemp,
      //   headers: {
      //     'accept': 'application/x-www-form-urlencoded',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Access-Control-Allow-Origin': '*'
      //   },
      //   data: {
      //     a: 123
      //   }
      // }).then(res => {
      //   alert(res.data.state)
      //   return res.data.state
      // })
      // var settings = {
      //   'url': 'http://localhost:56433/token',
      //   'method': 'GET',
      //   'timeout': 0,
      //   'headers': {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Authorization': 'Bearer zOE7iDzMK_ck3yw1_dyZMvmnEBlX0ClK313vhkLEfgfQmHCCazCTXCY3tV8WMAwcuoIWy624hUwfcjzmbnfNSAVANrC8mJlquNgdJJVi206kTB7K2MGz7JJRgAWmQfcaV9MP5Q5zrdST7qq7nJ8GbFtKAZRdbKQZ1qOfLgjUHKaYOXXNndGQDxTSZ0Lrh1Drr6suZKjq-S83RWM7Z5dQ5A'
      //   },
      //   'data': {
      //     'username': 'user',
      //     'password': 'user',
      //     'grant_type': 'password'
      //   }
      // }

      // $.ajax(settings).done(function (response) {
      //   console.log(response)
      // })
    }
  }
}
</script>
