<template>
    <div>
        <input id="parentData" type="hidden"/>
        <input id="stockNo" type="hidden"/>
        <input id="stockType" type="hidden" value="I"/>
        <div class="btn">
            <button @click="closeDialog">닫기</button>
            <button @click="saveIpgo">저장</button>
        </div>
        <br/>
        <br/>
        <div style="margin-left:50px">
            입고일자 : <input type="text" id="ipchulDate"/>
            <br/>
            자재명 : <select name="matNo" id="matNo">
            </select>
            <br/>
            입고개수 : <input type="text" id="ipchulCnt"/>
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
      msg: '자재 입고 상세 현황',
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
    saveIpgo () {
      if ($('#stockNo').val() !== '') {
        strTemp = 'http://10.10.11.33/Home/IpgoUpdate?' + 'stockNo=' + $('#stockNo').val() + 'matNo=' + $('#matNo').val() + '&ipchulCnt=' + $('#ipchulCnt').val() + '&stockType=' + $('#stockType').val() + '&rmk=' + $('#rmk').val() + '&ipchulDate=' + $('#ipchulDate').val()
      } else {
        strTemp = 'http://10.10.11.33/Home/IpgoAdd?' + 'matNo=' + $('#matNo').val() + '&ipchulCnt=' + $('#ipchulCnt').val() + '&stockType=' + $('#stockType').val() + '&ipchulDate=' + $('#ipchulDate').val() + '&rmk=' + $('#rmk').val()
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
