<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="btn-group float-right mt-2">
          <button @click="savechulgo" class="btn btn-primary mr-1">저장</button>
          <button @click="delchulgo" class="btn btn-warning mr-1">삭제</button>
          <button @click="closeDialog" class="btn btn-dark">닫기</button>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div class="row">
      <input id="parentData" type="hidden" v-model="chulgoSpeData"/>
      <input id="stockNo" type="hidden"/>
      <input id="stockType" type="hidden"/>
      <div style="margin-left:50px">
          출고일자 : <input type="text" id="ipchulDate" readonly="true"/>
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
      matNm: ''
    }
  },
  props: ['chulgoSpeData'],
  async mounted () {
    await this.getMaterialData()

    var parentData = $('#parentData').val().split(',')
    if (parentData.length > 1) {
      $('#stockNo').val(parentData[0])
      $('#ipchulDate').val(parentData[1])
      $('#matNo').val(parentData[2])
      $('#stockType').val(parentData[4])
      $('#ipchulCnt').val(parentData[6])
      $('#rmk').val(parentData[7])
    }
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
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          alert('저장하였습니다.')
          this.closeDialog()
        })
      } else {
        this.axios.post(strTemp, requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          alert('저장하였습니다.')
          this.closeDialog()
        })
      }
    },
    delchulgo () {
      if ($('#stockNo').val() !== '') {
        strTemp = 'http://10.10.11.33:8088/api/Chulgo?' + 'stockNo=' + $('#stockNo').val() + '&matNo=' + $('#matNo').val() + '&ipchulDate=' + $('#ipchulDate').val() + '&stockType=' + $('#stockType').val()
        this.axios.delete(strTemp, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get('user_session'),
            'Content-Type': 'application/json'
          }
        }).then(res => {
          alert('삭제하였습니다.')
          this.closeDialog()
        })
      } else {
        alert('데이터가 존재하는지 확인해주세요.')
      }
    }
  }
}
</script>
<style>
</style>
