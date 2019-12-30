<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="btn-group float-right mt-2">
          <button @click="saveMaterial" class="btn btn-primary mr-1">저장</button>
          <button v-if="flag" @click="deleteMaterial" class="btn btn-warning mr-1">삭제</button>
          <button @click="closeDialog" class="btn btn-dark">닫기</button>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div class="row">
      <input id="parentData" v-model="matAdd" type="hidden" />
      <input id="matNo" type="hidden"/>
      <div style="margin-left:50px">
          자재명 : <input type="text" id="materialName" />
          <br/>
          품번 : <input type="text" id="itemNo" />
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
      await this.axios.get('http://localhost:801/api/MaterialGrp').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          strTemp = '<option value= ' + res.data[i].grpCd + '>' + res.data[i].grpNm + '</option>'
          $('#matGrp').append(strTemp)
        }
      })
      $('#matGrp option:eq(0)').prop('selected', true)
    },
    getMaterialSubGrpData () {
      $('#matSub').empty()
      this.axios.get('http://localhost:801/api/MaterialGrp/' + $('#matGrp').val()).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          strTemp = '<option value= ' + res.data[i].subCd + '>' + res.data[i].subNm + '</option>'
          $('#matSub').append(strTemp)
        }
      })
    },
    saveMaterial () {
      var requestData = {
        matNo: $('#matNo').val(),
        grpCd: $('#matGrp').val(),
        subGrpCd: $('#matSub').val(),
        matNm: $('#materialName').val(),
        itemNo: $('#itemNo').val(),
        rmk: $('#rmk').val()
      }
      strTemp = 'http://localhost:801/api/Material'
      if ($('#matNo').val() === '') {
        this.axios.post(strTemp, requestData).then(res => {
          alert('저장하였습니다.')
          this.closeDialog()
        })
      } else {
        this.axios.put(strTemp, requestData).then(res => {
          alert('저장하였습니다.')
          this.closeDialog()
        })
      }
    },
    deleteMaterial () {
      strTemp = 'http://localhost:801/api/Material/' + $('#matNo').val()
      this.axios.delete(strTemp).then(res => {
        alert('삭제하였습니다.')
        this.closeDialog()
      })
    }
  }
}
</script>
<style>
</style>
