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
              <form>
                <div class="form-group">
                    <label for="userid">사용자ID</label>
                    <input type="text" name="userid" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="password">패스워드</label>
                    <input type="password" name="password" class="form-control" />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">로그인</button>
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
      msg: '로그인'
    }
  }
}
</script>
