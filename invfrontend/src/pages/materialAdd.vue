<template>
    <div>
        <input id="parentData" type="hidden" v-model="matAdd"/>
        <input id="matNo" type="hidden"/>
        <div class="btn">
            <button @click="closeDialog">닫기</button>
            <button @click="saveMaterial">저장</button>
            <button v-if="flag" @click="deleteMaterial">삭제</button>
        </div>
        <br/>
        <br/>
        <div style="margin-left:50px">
            자재명 : <input type="text" id="materialName" />
            <br/>
            품번 : <input type="text" id="itemNo"/>
            <br/>
            자재그룹명 : <select @change="getMaterialSubGrpData" name="matGrp" id="matGrp">
            </select>
            <br/>
            자재소그룹명 : <select name="matSub" id="matSub">
            </select>
            <br/>
            비고 : <input type="text" id="rmk"/>
            <br/>
        </div>
    </div>
</template>

<script>
var strTemp = ''
export default {
  data: () => ({
    flag: true
  }),
  props: ['matAdd'],
  async mounted () {
    await this.getMaterialGrpData()
    this.getMaterialSubGrpData()

    var parentData = $('#parentData').val().split(',')
    if (parentData.length > 1) {
      $('#matNo').val(parentData[0])
      $('#matGrp').val(parentData[1])
      $('#matSub').val(parentData[2])
      $('#materialName').val(parentData[3])
      $('#itemNo').val(parentData[4])
      $('#rmk').val(parentData[7])
    }

    if ($('#matNo').val() === '') {
      this.flag = false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    async getMaterialGrpData () {
      await this.axios.get('http://10.10.11.33/Home/MaterialGrpSearch').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          strTemp = '<option value= ' + res.data[i].grpCd + '>' + res.data[i].grpNm + '</option>'
          $('#matGrp').append(strTemp)
        }
      })
      $('#matGrp option:eq(0)').prop('selected', true)
    },
    getMaterialSubGrpData () {
      $('#matSub').empty()
      this.axios.get('http://10.10.11.33/Home/MaterialSubGrpSearch?grpCd=' + $('#matGrp').val()).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          strTemp = '<option value= ' + res.data[i].subCd + '>' + res.data[i].subNm + '</option>'
          $('#matSub').append(strTemp)
        }
      })
    },
    saveMaterial () {
      if ($('#matNo').val() !== '') {
        strTemp = 'http://10.10.11.33/Home/MaterialUpdate?' + 'matNo=' + $('#matNo').val() + '&grpCd=' + $('#matGrp').val() + '&subCd=' + $('#matSub').val() + '&matNm=' + $('#materialName').val() + '&itemNo=' + $('#itemNo').val() + '&rmk=' + $('#rmk').val()
      } else {
        strTemp = 'http://10.10.11.33/Home/MaterialAdd?' + 'grpCd=' + $('#matGrp').val() + '&subCd=' + $('#matSub').val() + '&matNm=' + $('#materialName').val() + '&itemNo=' + $('#itemNo').val() + '&rmk=' + $('#rmk').val()
      }
      this.axios.get(strTemp).then(res => {
        alert('저장하였습니다.')
        this.closeDialog()
      })
    },
    deleteMaterial () {
      strTemp = 'http://10.10.11.33/Home/MaterialDelete?' + 'matNo=' + $('#matNo').val()
      this.axios.get(strTemp).then(res => {
        alert('삭제하였습니다.')
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
