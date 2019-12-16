<template>
  <div style="width:100%; height : 100%">
    <div style="height:20%; width:100%" class="top">
      <div>재고관리</div>
    </div>
    <div style="height:80%; width:100%; position:fixed">
      <div class="left" style="width:30%">
        <ul>
          <li id="logo">
            <div>Inventory</div>
            <div>Manager</div>
          </li>
          <li v-for="list in linklist" :key="list.content">
        <router-link :to="list.link" >{{ list.content }}</router-link>
          </li>
          <li id="company">
            <div>Welcomt to Inventory</div>
            <div>Seoul Gangnam <br> ... </div>
            <div>@copyright demnodey</div>
          </li>
        </ul>
      </div>
    </div>
    <img id='left_btn' @click='toggle' src='../assets/images/left_btn.png'>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      toggle: this.enter,
      linklist: [
        {content: 'HOME', link: '/home'},
        {content: 'MANAGER', link: '/manager'},
        {content: 'STATE', link: '/state'},
        {content: 'RESISTER', link: '/resister'}
      ]
    }
  },
  created () {
    this.resize()
  },
  methods: {
    enter: function (el, done) {
      this.toggle = this.leave
      var left = (250 - (parseInt($('#left_btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '0px'}, 800)
      $('#left_btn').stop().animate({left: left}, 800)
      $('#left_btn').css({transform: 'rotate(180deg)'})
    },
    leave: function (el, done) {
      this.toggle = this.enter
      var left = (0 - (parseInt($('#left_btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '-250px'}, 800)
      $('#left_btn').stop().animate({left: left}, 800)
      $('#left_btn').css({transform: 'rotate(0deg)'})
    },
    resize: function () {
      $(window).resize(function () {
        var height = (window.innerHeight / 2) + 'px'
        $('#left_btn').css({'top': height})
      })
    }
  }
}
</script>

<style>
  a{color:black}
  a:hover{color:rgb(214, 158, 236);}
  .left{
    top:0px;
    background:rgba(135, 19, 202, 0.6);
    padding:40px 0;
  }
  .top{font-family: 'Passion One', cursive; font-size:30px; text-align: left;}
  .left ul {padding: 0 30px}
  .left ul li { font-size:20px; height:75px;}
  .left ul li#logo {font-family: 'Passion One', cursive; font-size:40px; height:170px;}
  .left ul li#logo div {line-height: 0.8}
  .left ul li#company {font-size:16px; margin-top:150px; }
  #left_btn {position:fixed; top:495px; left:29%; cursor:pointer}
</style>
