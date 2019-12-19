<template>
    <div>
        <input id="parentData" type="hidden" v-model="ipgoSpeData"/>
        <input id="stockNo" type="hidden"/>
        <div class="btn">
            <button>닫기</button>
            <button @click="saveIpgo">저장</button>
        </div>
        <br/>
        <br/>
        <div style="margin-left:50px">
            입고일자 : <input type="text" id="ipchulDate"/>
            <br/>
            자재명 : <select @change="getMaterialData" name="matNo" id="matNo">
            </select>
            <br/>
            품번 : <input type="text" id="itemNo"/>
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
      $('#itemNo').val(parentData[4])
      $('#ipchulCnt').val(parentData[5])
      $('#rmk').val(parentData[6])
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
        strTemp = 'http://10.10.11.33/Home/IpgoUpdate?' + 'matNo=' + $('#matNo').val() + 'grpCd=' + $('#matGrp').val() + '&subCd=' + $('#matSub').val() + '&matNm=' + $('#materialName').val() + '&itemNo=' + $('#itemNo').val() + '&rmk=' + $('#rmk').val()
      } else {
        strTemp = 'http://10.10.11.33/Home/IpgoAdd?' + 'grpCd=' + $('#matNo').val() + '&subCd=' + $('#matSub').val() + '&matNm=' + $('#materialName').val() + '&itemNo=' + $('#itemNo').val() + '&rmk=' + $('#rmk').val()
      }
      this.axios.get(strTemp).then(res => {
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
