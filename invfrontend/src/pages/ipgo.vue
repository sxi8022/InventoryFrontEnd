<template>
    <div class="btnclass">
        <h1>{{ msg }}</h1>
        <div id="search" class="search">
          <kendo-datepicker v-on:open="onOpen" v-on:close="onClose"></kendo-datepicker>
        </div>
        <div id="grid"></div>
    </div>
</template>

<script>
export default {
  name: 'ipgo',
  data () {
    return {
      msg: 'Hello Kendo UI for Vue.js'
    }
  },
  methods: {
    onOpen: function (e) {
      console.log('DateRangePicker is opened')
    },
    onClose: function (e) {
      console.log('DateRangePicker is closed')
    },
    onChange: function (e) {
      console.log('DateRangePicker selected date is changed')
    }
  }
}
</script>
<style>
#ipgodate{width:0px;height:0px;overflow: hidden;}
</style>
