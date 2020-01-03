<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="btn-group float-right mt-2">
          <button @click="savechulgo" class="btn btn-primary">저장</button>
          <button @click="closeDialog" class="btn btn-dark mr-1">닫기</button>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div class="row">
      <input id="parentData" type="hidden"/>
      <input id="stockNo" type="hidden"/>
      <input id="stockType" type="hidden" value="O"/>
      <div style="margin-left:50px">
          출고일자 :
            <kendo-datepicker id="ipchulDate"
                      :value="currentDate"
                      :format="'yyyy-MM-dd'"></kendo-datepicker>
          <br/>
          자재명 : <select name="matNo" id="matNo"></select>
          <br/>
          출고개수 : <input type="text" id="ipchulCnt"/>
          <br/>
          비고 : <input type="text" id="rmk"/>
          <br/>
      </div>
    </div>
  </div>
</template>

<script>
var strTemp = ''
export default {
  data () {
    return {
      msg: '자재 출고 상세 현황',
      matNm: '',
      currentDate: new Date()
    }
  },
  async mounted () {
    await this.getMaterialData()
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    async getMaterialData () {
      await this.axios.get('http://10.10.11.33:8088/api/Material', {
        headers: {
          'Authorization': 'Bearer ' + this.$cookies.get('user_session'),
          'Content-Type': 'application/json'
        }
      }).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          strTemp = '<option value= ' + res.data[i].matNo + '>' + res.data[i].matNm + '</option>'
          $('#matNo').append(strTemp)
        }
      })
      $('#matNo option:eq(0)').prop('selected', true)
    },
    savechulgo () {
      if ($('#matNo').val() === '' || $('#matNo').val() === null || $('#matNo').val() === undefined) {
        alert('자재를 선택해주세요.')
        return false
      }
      if ($('#ipchulCnt').val() === '' || $('#ipchulCnt').val() === null || $('#ipchulCnt').val() === undefined) {
        alert('개수를 선택해주세요.')
        return false
      }
      if ($('#ipchulDate').val() === '' || $('#ipchulDate').val() === null || $('#ipchulDate').val() === undefined) {
        alert('입출고일자를 선택해주세요.')
        return false
      }
      var requestData = {
        stockNo: $('#stockNo').val(),
        matNo: $('#matNo').val(),
        ipchulCnt: $('#ipchulCnt').val(),
        stockType: $('#stockType').val(),
        ipchulDate: $('#ipchulDate').val(),
        rmk: $('#rmk').val()
      }
      strTemp = 'http://10.10.11.33:8088/api/Chulgo'
      if ($('#stockNo').val() !== '') {
        this.axios.put(strTemp, requestData, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get('user_session'),
            'Content-Type': 'application/json'
          }
        }).then(res => {
          alert('저장하였습니다.')
          this.closeDialog()
        })
      } else {
        this.axios.post(strTemp, requestData, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get('user_session'),
            'Content-Type': 'application/json'
          }
        }).then(res => {
          alert('저장하였습니다.')
          this.closeDialog()
        })
      }
    }
  }
}
</script>
<style>
</style>
