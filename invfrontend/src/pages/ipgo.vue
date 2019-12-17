<template>
    <div style="width:85%; height:100%; position:fixed">
      <div style="height:10%; width:100%">
        <h1>{{ msg }}</h1>
      </div>
      <div style="height:100%; width:85%;">
        <div id="search" class="search">
          <kendo-datepicker v-on:open="onOpen" v-on:close="onClose"></kendo-datepicker>
        </div>
        <div class="btn">
            <button id="btnAdd">등록</button>
            <button id="btnSearch">조회</button>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="grid" :data-source="localDataSource">
        </kendo-grid>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ipgo',
  data () {
    return {
      msg: '자재 입고 현황',
      localDataSource: [{
      }
      ]
    }
  },
  async mounted () {
    // const response = await ApiDefault.instance.get('')
    // console.log(response.data)
    await this.axios.get('http://10.10.11.98/').then(async res => {
      this.localDataSource.data = res.data
      $('#grid').data('kendoGrid').dataSource.read()
    })
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
.btn button{
    float: right;
    background: white;
    border-color:black;
    width: 80px;
}
</style>
