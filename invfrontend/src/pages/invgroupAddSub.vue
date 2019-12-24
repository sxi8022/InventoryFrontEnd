<template>
    <div>
        <input id="parentData" type="hidden" v-model="grpSubAdd"/>
        <input id="hidGroupCd" type="hidden"/>
        <input id="hidGroupSubCd" type="hidden"/>
        <div class="btn">
            <button @click="closeDialog(false)">닫기</button>
            <button @click="deleteMaterialGrp">삭제</button>
            <button @click="saveMaterialGrp">저장</button>
        </div>
        <br/>
        <br/>
        <div style="margin-left:50px">
            대분류명 : <input type="text" id="txtGroupNm" disabled="true"/>
            <br/>
            중분류명 : <input type="text" id="txtGroupSubNm" />
            <br/>
            비고    : <input type="text" id="txtRmk"/>
            <br/>
        </div>
    </div>
</template>

<script>
var strTemp = ''
export default {
  data: () => ({
  }),
  props: ['grpSubAdd'],
  async mounted () {
    var parentData = $('#parentData').val().split(',')
    console.log(parentData[0])
    if (parentData.length === 6) {
      console.log('ddd111')
      $('#hidGroupCd').val(parentData[0])
      $('#hidGroupSubCd').val(parentData[1])
      $('#txtGroupNm').val(parentData[2])
      $('#txtGroupSubNm').val(parentData[3])
      $('#txtRmk').val(parentData[4])
    } else {
      $('#hidGroupCd').val(parentData[0])
      $('#txtGroupNm').val(parentData[1])
    }
  },
  methods: {
    closeDialog (change) {
      this.$emit('close')
    },
    saveMaterialGrp () {
      console.log($('#hidGroupSubCd').val())
      if ($('#hidGroupCd').val() !== '' && $('#hidGroupSubCd').val() !== '') {
        strTemp = 'http://10.10.11.33/Home/MatGrpSubUpdate?' + 'grpCd=' + $('#hidGroupCd').val() + '&subCd=' + $('#hidGroupSubCd').val() + '&grpSubNm=' + $('#txtGroupSubNm').val() + '&rmk=' + $('#txtRmk').val()
      } else {
        strTemp = 'http://10.10.11.33/Home/MatGrpSubAdd?' + 'grpCd=' + $('#hidGroupCd').val() + '&grpNm=' + $('#txtGroupSubNm').val() + '&rmk=' + $('#txtRmk').val()
      }
      console.log(strTemp)
      this.axios.get(strTemp).then(res => {
        alert('저장하였습니다.')
        this.closeDialog(true)
      })
    },
    deleteMaterialGrp () {
    //   console.log($('#hidGroupCd').val())
      if ($('#hidGroupCd').val() !== '' && $('#hidGroupSubCd').val() !== '') {
        strTemp = 'http://10.10.11.33/Home/MatGrpSubDelete?' + 'grpCd=' + $('#hidGroupCd').val() + '&subCd=' + $('#hidGroupSubCd').val()
        this.axios.get(strTemp).then(res => {
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
