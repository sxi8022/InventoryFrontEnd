<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="btn-group float-right mt-2">
          <button @click="saveMaterialGrp" class="btn btn-primary mr-1">저장</button>
          <button @click="deleteMaterialGrp" class="btn btn-warning mr-1">삭제</button>
          <button @click="closeDialog(false)" class="btn btn-dark">닫기</button>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div class="row">
      <input id="parentData" type="hidden" v-model="grpSubAdd"/>
      <input id="hidGroupCd" v-model="matSubGrp.grpCd" type="hidden"/>
      <input id="hidGroupSubCd" v-model="matSubGrp.subCd" type="hidden"/>
      <div style="margin-left:50px">
            대분류명 : <input type="text" id="txtGroupNm" v-model="matSubGrp.grpNm" disabled="true"/>
            <br/>
            중분류명 : <input type="text" id="txtGroupSubNm" v-model="matSubGrp.subNm" />
            <br/>
            비고    : <input type="text" id="txtRmk" v-model="matSubGrp.rmk"/>
            <br/>
      </div>
    </div>
  </div>
</template>
<script>
var strTemp = ''
export default {
  data: () => ({
    matSubGrp: {
      grpCd: '',
      subCd: '',
      grpNm: '',
      subNm: '',
      rmk: ''
    }
  }),
  props: ['grpSubAdd'],
  async mounted () {
    var parentData = $('#parentData').val().split(',')
    console.log(parentData[0])
    if (parentData.length === 6) {
      console.log('ddd111')
      this.matSubGrp.grpCd = parentData[0]
      this.matSubGrp.subCd = parentData[1]
      this.matSubGrp.grpNm = parentData[2]
      this.matSubGrp.subNm = parentData[3]
      this.matSubGrp.rmk = parentData[4]
    } else {
      this.matSubGrp.grpCd = parentData[0]
      this.matSubGrp.grpNm = parentData[1]
    }
  },
  methods: {
    closeDialog (change) {
      this.$emit('close')
    },
    saveMaterialGrp () {
      strTemp = 'http://10.10.11.33:801/api/MaterialSubGrp'
      if ($('#hidGroupCd').val() !== '' && $('#hidGroupSubCd').val() !== '') {
        this.axios.put(strTemp, this.matSubGrp).then(res => {
          alert('저장하였습니다.')
          this.closeDialog(true)
        })
      } else {
        this.axios.post(strTemp, this.matSubGrp).then(res => {
          alert('저장하였습니다.')
          this.closeDialog(true)
        })
      }
      console.log(strTemp)
    },
    deleteMaterialGrp () {
    //   console.log($('#hidGroupCd').val())
      if ($('#hidGroupCd').val() !== '' && $('#hidGroupSubCd').val() !== '') {
        strTemp = 'http://10.10.11.33:801/api/MaterialSubGrp?grpCd=' + this.matSubGrp.grpCd + '&subCd=' + this.matSubGrp.subCd
        this.axios.delete(strTemp).then(res => {
          alert('삭제하였습니다.')
          this.closeDialog(true)
        })
      } else {
        alert('삭제할 데이터가 없습니다.')
        this.closeDialog(false)
      }
    }
  }
}
</script>
<style>
</style>
