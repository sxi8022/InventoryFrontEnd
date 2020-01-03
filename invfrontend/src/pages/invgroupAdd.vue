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
      <input id="parentData" type="hidden" v-model="grpAdd"/>
      <input id="hidGroupCd" type="hidden" v-model="matGrp.grpCd"/>
      <div style="margin-left:50px">
          대분류명 : <input type="text" id="txtGroupNm" v-model="matGrp.grpNm"/>
          <br/>
          비고    : <input type="text" id="txtRmk" v-model="matGrp.rmk"/>
          <br/>
      </div>
    </div>
  </div>
</template>

<script>
var strTemp = ''
export default {
  data: () => ({
    matGrp: {
      grpCd: '',
      grpNm: '',
      rmk: ''
    }
  }),
  props: ['grpAdd'],
  async mounted () {
    var parentData = $('#parentData').val().split(',')
    if (parentData.length > 1) {
      this.matGrp.grpCd = parentData[0]
      this.matGrp.grpNm = parentData[1]
      this.matGrp.rmk = parentData[2]
      console.log($('#hidGroupCd'))
    }
  },
  methods: {
    closeDialog (change) {
      this.$emit('close', change)
    },
    saveMaterialGrp () {
      strTemp = 'http://10.10.11.33:801:801/api/MaterialGrp'
      if ($('#hidGroupCd').val() === '') {
        this.axios.post(strTemp, this.matGrp).then(res => {
          alert('저장하였습니다.')
          this.closeDialog(true)
        })
      } else {
        this.axios.put(strTemp, this.matGrp).then(res => {
          alert('저장하였습니다.')
          this.closeDialog(true)
        })
      }
    },
    deleteMaterialGrp () {
      console.log($('#hidGroupCd').val())
      if ($('#hidGroupCd').val() !== '') {
        strTemp = 'http://10.10.11.33:801:801/api/MaterialGrp/' + $('#hidGroupCd').val()
        this.axios.delete(strTemp).then(res => {
          alert('삭제하였습니다.')
          this.closeDialog(true)
        })
      } else {
        alert('삭제할 데이터가 없습니다.')
        this.closeDialog(false)
      }
      // console.log(strTemp)
    }
  }
}
</script>
<style>
</style>
