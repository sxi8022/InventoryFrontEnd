<template>
    <div>
        <input id="parentData" type="hidden" v-model="ipgoSpeData"/>
        <input id="stockNo" type="hidden"/>
        <input id="stockType" type="hidden"/>
        <div class="btn">
            <button @click="closeDialog">닫기</button>
            <button @click="saveIpgo">저장</button>
            <button @click="delIpgo">삭제</button>
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
  props: ['ipgoSpeData'],
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
        strTemp = 'http://10.10.11.33/Home/IpgoUpdate?' + 'stockNo=' + $('#stockNo').val() + '&matNo=' + $('#matNo').val() + '&ipchulCnt=' + $('#ipchulCnt').val() + '&stockType=' + $('#stockType').val() + '&rmk=' + $('#rmk').val() + '&ipchulDate=' + $('#ipchulDate').val()
      } else {
        strTemp = 'http://10.10.11.33/Home/IpgoAdd?' + 'matNo=' + $('#matNo').val() + '&ipchulCnt=' + $('#ipchulCnt').val() + '&stockType=' + $('#stockType').val() + '&ipchulDate=' + $('#ipchulDate').val() + '&rmk=' + $('#rmk').val()
      }
      this.axios.get(strTemp).then(res => {
        alert('저장하였습니다.')
        this.closeDialog()
      })
    },
    delIpgo () {
      if ($('#stockNo').val() !== '') {
        strTemp = 'http://10.10.11.33/Home/IpgoDelete?' + 'stockNo=' + $('#stockNo').val() + '&matNo=' + $('#matNo').val() + '&ipchulDate=' + $('#ipchulDate').val() + '&stockType=' + $('#stockType').val()
      }
      this.axios.get(strTemp).then(res => {
        this.$emit('close')
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
