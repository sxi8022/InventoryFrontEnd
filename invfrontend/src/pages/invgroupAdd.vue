<template>
    <div>
        <input id="parentData" type="hidden" v-model="grpAdd"/>
        <input id="hidGroupCd" type="hidden"/>
        <div class="btn">
            <button @click="closeDialog">닫기</button>
            <button @click="saveMaterialGrp">저장</button>
        </div>
        <br/>
        <br/>
        <div style="margin-left:50px">
            대분류명 : <input type="text" id="txtGroupNm" />
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
  props: ['grpAdd'],
  async mounted () {
    var parentData = $('#parentData').val().split(',')
    console.log(parentData[0])
    if (parentData.length > 1) {
      $('#hidGroupCd').val(parentData[0])
      $('#txtGroupNm').val(parentData[1])
      $('#txtRmk').val(parentData[2])
      console.log($('#hidGroupCd'))
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    saveMaterialGrp () {
      console.log($('#hidGroupCd').val())
      if ($('#hidGroupCd').val() !== '') {
        strTemp = 'http://10.10.11.39/Home/MatGrpUpdate?' + 'grpCd=' + $('#hidGroupCd').val() + '&grpNm=' + $('#txtGroupNm').val() + '&rmk=' + $('#txtRmk').val()
      } else {
        strTemp = 'http://10.10.11.39/Home/MatGrpAdd?' + 'grpNm=' + $('#txtGroupNm').val() + '&rmk=' + $('#txtRmk').val()
      }
      console.log(strTemp)
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
