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
                    <input type="text" v-model="userid" name="userid" class="form-control" />
                    <small>{{ idValidation }}</small>
                </div>
                <div class="form-group">
                    <label for="password">패스워드</label>
                    <input type="password" v-model="password" name="password" class="form-control" />
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
      loginData: {
        userid: '',
        password: '',
        state: ''
      }
    }
  },
  computed: {
    idValidation: function () {
      return this.userid.length > 4 ? '' : '4자 이상 입력해주세요.'
    }
  },
  methods: {
    loginUser () {
      var strTemp = 'http://10.10.11.33:80/api/Account'
      this.loginData = {
        userid: this.$refs.userid.value,
        password: this.$refs.password.value,
        state: ''
      }
      this.axios.post(strTemp, this.loginData).then(res => {
        if (res.state === 'SUCCESS') {
          alert('성공하였습니다.')
        } else {
          alert('실패하였습니다.')
        }
      })
    }
  }
}
</script>
