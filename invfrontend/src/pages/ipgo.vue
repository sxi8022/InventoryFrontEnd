<template>
    <div style="width:85%; height:100%; position:fixed">
      <div style="height:10%; width:100%">
        <h1>{{ msg }}</h1>
      </div>
      <div style="height:100%; width:85%;">
        <div id="search" class="search">
           <div style="display:inline-flex">
            <div style="margin-right:20px">
                <span>시작:</span>
                <kendo-datepicker id="start" v-on:change="startChange" :value="fromDate" :format="'yyyy-MM-dd'"></kendo-datepicker>
            </div>
            <div>
                <span>종료:</span>
                <kendo-datepicker id="end" v-on:change="endChange" :value="toDate" :format="'yyyy-MM-dd'"></kendo-datepicker>
            </div>
          </div>
        </div>
        <div class="btn">
            <button id="btnAdd" @click="showIpgoPopup">등록</button>
            <button id="btnSearch" @click="getIpgoData">조회</button>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="grid" :data-source="localDataSource" :columns="ipgo" :selectable="true" :sortable="true" @change="onChange">
        </kendo-grid>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="gridspe" :data-source="speDataSource" :columns="ipgospe" :selectable="true" :sortable="true" @change="onChangeSpe">
        </kendo-grid>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import ipgoAdd from './ipgoAdd.vue'
export default {
  name: 'ipgo',
  data () {
    return {
      msg: '자재 입고 현황',
      localDataSource: [],
      speDataSource: [],
      fromDate: moment(new Date()).add(-1, 'month').format('YYYY-MM-DD'),
      toDate: moment(new Date()).format('YYYY-MM-DD'),
      stockNo: 0,
      ipgo: [{
        field: 'stockNo', title: '입고번호', type: 'number' },
      { field: 'ipchulDate', title: '입고일자' }
      ],
      ipgospe: [{
        field: 'stockNo', title: '입고번호', type: 'number', editable: false },
      { field: 'matNo', title: '자재번호', editable: false },
      { field: 'matNm', title: '자재명', editable: false },
      { field: 'itemNo', title: '품번', editable: false },
      { field: 'ipchulCnt', title: '입고개수', editable: true },
      { field: 'rmk', title: '비고', editable: true }
      ],
      selected: '',
      selectedSpe: ''
    }
  },
  created () {

  },
  mounted () {
    // const response = await ApiDefault.instance.get('')
    // console.log(response.data)
    this.getIpgoData(false)
    this.getIpgoSpeData()
    var start = $('#start').data('kendoDatePicker')
    var end = $('#end').data('kendoDatePicker')
    start.max(end.value())
    end.min(start.value())
  },
  watch: {
    fromDate: function (val) {
      console.log(this.fromDate + '변경')
    }
  },
  methods: {
    getIpgoData (search) {
      console.log(this.localDataSource)
      console.log('http://10.10.11.33/Home/IpgoList?fromDate=' + this.fromDate + '&toDate=' + this.toDate)
      this.localDataSource = []
      this.axios.get('http://10.10.11.33/Home/IpgoList?fromDate=' + this.fromDate + '&toDate=' + this.toDate).then(async res => {
        console.log(this.localDataSource)
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource.push(res.data[i])
        }
        $('#grid').data('kendoGrid').dataSource.read()
      })
    },
    getIpgoSpeData (stockNo, ipchulDate) {
      console.log(this.speDataSource)
      console.log('http://10.10.11.33/Home/IpgoSpeList?stockNo=' + stockNo)
      this.speDataSource = []
      this.axios.get('http://10.10.11.33/Home/IpgoSpeList?stockNo=' + stockNo).then(res => {
        console.log(this.speDataSource)
        for (var i = 0; i < res.data.length; i++) {
          this.speDataSource.push(res.data[i])
        }
        $('#gridspe').data('kendoGrid').dataSource.read()
      })
    },
    startChange: function (e) {
      var start = $('#start').data('kendoDatePicker')
      var end = $('#end').data('kendoDatePicker')
      var startDate = start.value()
      var endDate = end.value()
      if (startDate) {
        startDate = new Date(startDate)
        startDate.setDate(startDate.getDate())
        end.min(startDate)
      } else if (endDate) {
        start.max(new Date(endDate))
      } else {
        endDate = new Date()
        start.max(endDate)
        end.min(endDate)
      }
    },
    endChange: function (e) {
      var start = $('#start').data('kendoDatePicker')
      var end = $('#end').data('kendoDatePicker')
      var endDate = end.value()
      var startDate = start.value()
      if (endDate) {
        endDate = new Date(endDate)
        endDate.setDate(endDate.getDate())
        start.max(endDate)
      } else if (startDate) {
        end.min(new Date(startDate))
      } else {
        endDate = new Date()
        start.max(endDate)
        end.min(endDate)
      }
    },
    showIpgoPopup () {
      console.log(this.selectedSpe)
      this.$modal.show(ipgoAdd, {
        ipgoAdd: this.selectedSpe
      },
      {
        name: 'modal',
        width: '800px',
        height: '400px',
        draggable: true
      }
      )
    },
    onChange (ev) {
      this.selected = $.map(ev.sender.select(), function (item) {
        var strItem = ''
        $(item).find('td').each(function () {
          strItem += $(this).text() + ','
        })
        strItem = strItem.substr(0, strItem.length - 1)
        return strItem
      })
      var parentData = this.selected[0]
      var transGridData = parentData.split(',')
      var stockNoData = transGridData[0]
      var ipchulDateData = transGridData[1]
      this.getIpgoSpeData(stockNoData, ipchulDateData)
    },
    onChangeSpe (ev) {
      this.selectedSpe = $.map(ev.sender.select(), function (item) {
        var strItem = ''
        $(item).find('td').each(function () {
          strItem += $(this).text() + ','
        })
        strItem = strItem.substr(0, strItem.length - 1)
        return strItem
      })
      this.showIpgoPopup()
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
