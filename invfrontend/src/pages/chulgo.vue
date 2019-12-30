<template>
    <div style="width:85%; height:100%; position:fixed">
      <div class="row mt-1 mb-2">
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10 d-flex justify-content-center" style="height:10%; width:100%">
          <h1>{{ msg }}</h1>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
        </div>
      </div>
      <div style="height:100%; width:85%;">
        <div id="search" class="row">
          <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10 d-flex justify-content-center pl-5">
            <div>
              <span>시작:</span>
              <kendo-datepicker id="start" v-on:change="startChange" :value="fromDate" :format="'yyyy-MM-dd'"></kendo-datepicker>
            </div>
            <div class="ml-4">
              <span>종료:</span>
                <kendo-datepicker id="end" v-on:change="endChange" :value="toDate" :format="'yyyy-MM-dd'"></kendo-datepicker>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <div class="btn-group float-right mt-2">
              <button id="btnAdd" @click="showchulgoPopup" class="btn btn-primary mr-1">등록</button>
              <button id="btnSearch" @click="getchulgoData" class="btn btn-primary">조회</button>
            </div>
          </div>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="grid" :data-source="chulgoDataSource" :columns="chulgo" :selectable="true" :sortable="true" @change="onChange">
        </kendo-grid>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="gridspe" :data-source="speChulgoDataSource" :columns="chulgospe" :selectable="true" :sortable="true" @change="onChangeSpe">
        </kendo-grid>
        </div>
      </div>
      <modals-container v-on:close="getchulgoData"/>
    </div>
</template>

<script>
import moment from 'moment'
import chulgoAdd from './chulgoAdd.vue'
import chulgoEdit from './chulgoEdit.vue'
export default {
  name: 'chulgo',
  data () {
    return {
      msg: '자재 출고 현황',
      chulgoDataSource: [],
      speChulgoDataSource: [],
      fromDate: moment(new Date()).add(-1, 'month').format('YYYY-MM-DD'),
      toDate: moment(new Date()).format('YYYY-MM-DD'),
      stockNo: 0,
      chulgo: [{
        field: 'stockNo', title: '출고번호', type: 'number' },
      { field: 'ipchulDate', title: '출고일자' }
      ],
      chulgospe: [{
        field: 'stockNo', title: '출고번호', type: 'number' },
      { field: 'ipchulDate', title: '출고일자', hidden: 'true' },
      { field: 'matNo', title: '자재번호' },
      { field: 'matNm', title: '자재명' },
      { field: 'stockType', title: '재고유형', hidden: 'true' },
      { field: 'itemNo', title: '품번' },
      { field: 'ipchulCnt', title: '출고개수' },
      { field: 'rmk', title: '비고' }
      ],
      selected: '',
      selectedSpe: '',
      selectedstockNo: 0,
      selectedIpchulDate: ''
    }
  },
  components: {
    chulgoAdd,
    chulgoEdit
  },
  created () {

  },
  mounted () {
    // const response = await ApiDefault.instance.get('')
    // console.log(response.data)
    this.getchulgoData()
    this.getchulgoSpeData()
    var start = $('#start').data('kendoDatePicker')
    var end = $('#end').data('kendoDatePicker')
    start.max(end.value())
    end.min(start.value())
  },
  watch: {
    fromDate: function (newval, oldval) {
      console.log(newval + '로 변경, 기존 : ' + oldval)
    },
    toDate: function (newval, oldval) {
      console.log(newval + '로 변경, 기존 : ' + oldval)
    }
  },
  methods: {
    getchulgoData () {
      console.log(this.chulgoDataSource)
      console.log('http://10.10.11.98/Home/ChulgoList?fromDate=' + this.fromDate + '&toDate=' + this.toDate)
      this.chulgoDataSource = []
      this.axios.get('http://10.10.11.98/Home/ChulgoList?fromDate=' + this.fromDate + '&toDate=' + this.toDate).then(res => {
        console.log(this.chulgoDataSource)
        for (var i = 0; i < res.data.length; i++) {
          this.chulgoDataSource.push(res.data[i])
        }
        $('#grid').data('kendoGrid').dataSource.read()
        this.getchulgoSpeData(this.selectedstockNo, this.selectedIpchulDate)
      })
    },
    getchulgoSpeData (stockNo, ipchulDate) {
      console.log(this.speChulgoDataSource)
      console.log('http://10.10.11.98/Home/chulgoSpeList?stockNo=' + stockNo)
      this.speChulgoDataSource = []
      this.axios.get('http://10.10.11.98/Home/chulgoSpeList?stockNo=' + stockNo).then(res => {
        console.log(this.speChulgoDataSource)
        for (var i = 0; i < res.data.length; i++) {
          this.speChulgoDataSource.push(res.data[i])
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
      this.fromDate = moment(startDate).format('YYYY-MM-DD')
      this.toDate = moment(endDate).format('YYYY-MM-DD')
    },
    endChange: function (e) {
      var start = $('#start').data('kendoDatePicker')
      var end = $('#end').data('kendoDatePicker')
      var startDate = start.value()
      var endDate = end.value()
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
      this.fromDate = moment(startDate).format('YYYY-MM-DD')
      this.toDate = moment(endDate).format('YYYY-MM-DD')
    },
    showchulgoPopup () {
      console.log(this.selectedSpe)
      this.$modal.show(chulgoAdd, {
        chulgoSpeData: this.selectedSpe
      },
      {
        name: 'modal',
        width: '800px',
        height: '400px',
        draggable: true
      }
      )
    },
    showchulgoSpePopup () {
      console.log(this.selectedSpe)
      this.$modal.show(chulgoEdit, {
        chulgoSpeData: this.selectedSpe
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
      this.selectedstockNo = stockNoData
      this.selectedIpchulDate = ipchulDateData
      this.getchulgoSpeData(stockNoData, ipchulDateData)
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
      this.showchulgoSpePopup()
    }
  }
}
</script>
<style>
</style>
