<template>
    <div>
        <input id="parentData" type="hidden" v-model="ipgoAdd"/>
        <input id="stockNo" type="hidden"/>
        <input id="matNo" type="hidden"/>
        <div class="btn">
            <button>닫기</button>
            <button @click="saveIpgo">저장</button>
        </div>
        <br/>
        <br/>
        <div style="margin-left:50px">
            입고일자 : <input type="text" id="ipchulDate" value="123" />
            <br/>
            자재명 : <select @change="getMaterialData" name="mat" id="mat">
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
      msg: '자재 입고 상세 현황'
    }
  },
  props: ['ipgoAdd'],
  async mounted () {
    await this.getMaterialData()

    var parentData = $('#parentData').val().split(',')
    $('#stockNo').val(parentData[0])
    $('#matNo').val(parentData[1])
    $('#ipchulDate').val(parentData[2])
    $('#matNm').val(parentData[3])
    $('#itemNo').val(parentData[4])
    $('#ipchulCnt').val(parentData[5])
    $('#rmk').val(parentData[6])
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    async getMaterialData () {
      await this.axios.get('http://10.10.11.33/Home/MaterialSearch').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          strTemp = '<option value= ' + res.data[i].matNo + '>' + res.data[i].matNm + '</option>'
          $('#mat').append(strTemp)
        }
      })
      $('#mat option:eq(0)').prop('selected', true)
    },
    saveIpgo () {
      if ($('#stockNo').val() !== '') {
        strTemp = 'http://10.10.11.33/Home/MaterialUpdate?' + 'matNo=' + $('#matNo').val() + 'grpCd=' + $('#matGrp').val() + '&subCd=' + $('#matSub').val() + '&matNm=' + $('#materialName').val() + '&itemNo=' + $('#itemNo').val() + '&rmk=' + $('#rmk').val()
      } else {
        strTemp = 'http://10.10.11.33/Home/MaterialAdd?' + 'grpCd=' + $('#matGrp').val() + '&subCd=' + $('#matSub').val() + '&matNm=' + $('#materialName').val() + '&itemNo=' + $('#itemNo').val() + '&rmk=' + $('#rmk').val()
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
