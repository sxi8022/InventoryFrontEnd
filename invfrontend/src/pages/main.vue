<template>
    <div>
        <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><h4>메인 홈페이지</h4></div>
            <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
        </div>
        <div class="row mt-1 mb-2">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <form v-on:submit.prevent="logout">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">로그아웃</button>
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
  name: 'main',
  data () {
    return {
      msg: '메인페이지',
      userid: '',
      password: '',
      status: '',
      formkey: '',
      tokenKey: '',
      cookies: ''
    }
  },
  computed: {
  },
  methods: {
    async logout () {
      var strTemp = 'http://localhost:55241/Token'
      this.userid = 'admin'
      this.password = 'admin'
      this.axios.post(strTemp, 'username=' + this.userid + '&password=' + this.password + '&grant_type=password', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        alert('로그아웃에 성공하였습니다')
        // sessionStorage.setItem(this.tokenKey, res.access_token)
        this.$cookies.remove('user-session')
        this.cookies = this.$cookies.get('user_session')
        console.log(this.cookies)
        this.$router.push({ path: '/', params: { msg: 'login' } })
      })
    }
  }
}
</script>
