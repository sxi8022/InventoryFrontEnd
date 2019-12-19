<template>
  <div style="width:85%; height:100%; position:fixed">
    <div style="height:10%; width:100%">
        <h1>
            {{title}}
        </h1>
    </div>
    <div style="height:100%; width:85%;">
        <div class="btn">
            <button id="btnAdd">등록</button>
            <button @click="getMaterialGrpData" id="btnSearch">조회</button>
        </div>
        <div>
          자재명 : <input v-model="material" type="text" id="matNm"/>
        </div>
        <br/><br/><br/>
        <div>
          <h3>대분류</h3>
          <kendo-grid id="grid1" :data-source="localDataSource1" :height="150" :columns="visibleCol1">
          </kendo-grid>
          <h3>중분류</h3>
          <kendo-grid id="grid2" :data-source="localDataSource2" :height="150" :columns="visibleCol2">
          </kendo-grid>
        </div>
    </div>
  </div>
</template>
<script>
// import { Post } from '../api/index'
// const ApiDefault = {
//   url: 'http://10.10.11.98/'
// }
// ApiDefault.instance = this.axios.create({ baseURL: ApiDefault.url })

export default {
  data () {
    return {
      title: '자재그룹',
      localDataSource1: [],
      localDataSource2: [],
      grp: '',
      visibleCol1: [
        {field: 'grpCd', title: '대분류코드'},
        {filed: 'grpNm', title: '대분류명'},
        {filed: 'rmk', title: '비고'}
      ],
      visibleCol2: [
        {field: 'grpCd', title: '대분류코드'},
        {field: 'subCd', title: '소분류코드'},
        {field: 'grpNm', title: '대분류명'},
        {field: 'subNm', title: '소분류명'},
        {field: 'rmk', title: '비고'}
      ]
    }
  },
  mounted () {
    this.getMaterialGrpData()
    this.getMaterialGrpSubData()
  },
  methods: {
    getMaterialGrpData () {
      this.localDataSource1 = []
      this.axios.get('http://10.10.11.39/Home/MaterialGrpSearch').then(res => {
        console.log(this.localDataSource1)
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource1.push(res.data[i])
        }
        $('#grid1').data('kendoGrid').dataSource.read()
      })
    },
    getMaterialGrpSubData () {
      this.localDataSource2 = []
      this.axios.get('http://10.10.11.39/Home/MaterialGrpSubSearch?grpCd=001').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource2.push(res.data[i])
        }
        console.log(this.localDataSource2)
        $('#grid2').data('kendoGrid').dataSource.read()
      })
    }
  },
  watch: {
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
