<template>
    <div>
        <input id="parentData" type="hidden"/>
        <input id="stockNo" type="hidden"/>
        <input id="stockType" type="hidden" value="O"/>
        <div class="btn">
            <button @click="closeDialog">닫기</button>
            <button @click="savechulgo">저장</button>
        </div>
        <br/>
        <br/>
        <div style="margin-left:50px">
            출고일자 : <input type="text" id="ipchulDate"/>
            <br/>
            자재명 : <select name="matNo" id="matNo"></select>
            <br/>
            출고개수 : <input type="text" id="ipchulCnt"/>
            <br/>
            비고 : <input type="text" id="rmk"/>
            <br/>
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
  async mounted () {
    await this.getMaterialData()
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    async getMaterialData () {
      await this.axios.get('http://10.10.11.33/Home/MaterialSearch').then(res => {
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
      if ($('#stockNo').val() !== '') {
        strTemp = 'http://10.10.11.33/Home/ChulgoUpdate?' + 'stockNo=' + $('#stockNo').val() + '&matNo=' + $('#matNo').val() + '&ipchulCnt=' + $('#ipchulCnt').val() + '&stockType=' + $('#stockType').val() + '&rmk=' + $('#rmk').val() + '&ipchulDate=' + $('#ipchulDate').val()
      } else {
        strTemp = 'http://10.10.11.33/Home/ChulgoAdd?' + 'stockNo=' + '0' + '&matNo=' + $('#matNo').val() + '&ipchulCnt=' + $('#ipchulCnt').val() + '&stockType=' + $('#stockType').val() + '&ipchulDate=' + $('#ipchulDate').val() + '&rmk=' + $('#rmk').val()
      }
      this.axios.get(strTemp).then(res => {
        alert('저장하였습니다.')
        this.closeDialog()
      })
    }
  }
}
</script>
<style scoped>
    .btn button{
        float: right;
        background: white;
        border-color:black;
        width: 80px;
    }
</style>
