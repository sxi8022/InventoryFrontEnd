<template>
  <div style="width:85%; height:100%; position:fixed">
    <div style="height:10%; width:100%">
      <div class="row mt-1 mb-2">
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10 d-flex justify-content-center" style="height:10%; width:100%">
          <h1>{{ title }}</h1>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
        </div>
      </div>
    </div>
    <div style="height:100%; width:85%;">
      <div id="search" class="row">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 d-flex justify-content-center pl-5">
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <!-- mt, mr 마진 속성 -->
          <div class="btn-group float-right mt-2">
            <button id="btnAdd1" class="btn btn-primary mr-1" @click="showAddDialog1">대분류 등록</button>
            <button id="btnAdd2" class="btn btn-primary mr-1" @click="showAddDialog2(false)">중분류 등록</button>
            <button @click="getMaterialGrpData" id="btnSearch" class="btn btn-primary">조회</button>
          </div>
        </div>
        <br/>
        <div>
          <h3>대분류</h3>
          <kendo-grid @change="onChange" id="grid1" :data-source="localDataSource1" :height="150" :selectable="true" :columns="visibleCol1">
          </kendo-grid>
          <h3>중분류</h3>
          <kendo-grid @change="onChangeSub" id="grid2" :data-source="localDataSource2" :height="200" :selectable="true" :columns="visibleCol2">
          </kendo-grid>
        </div>
      </div>
    </div>
    <modals-container v-on:close="getMaterialGrpData"/>
  </div>
</template>
<script>
import invgroupAdd from './invgroupAdd.vue'
import invgroupSubAdd from './invgroupAddSub.vue'
export default {
  data () {
    return {
      title: '자재그룹',
      localDataSource1: [],
      localDataSource2: [],
      selectedGrp: '',
      arrSelected: '',
      arrSelected2: '',
      grpCode: '',
      visibleCol1: [
        {field: 'grpCd', title: '대분류코드'},
        {field: 'grpNm', title: '대분류명'},
        {field: 'rmk', title: '비고'}
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
  conponents: {
    invgroupAdd
  },
  mounted () {
    this.getMaterialGrpData()
  },
  methods: {
    getMaterialGrpData () {
      this.arrSelected = ''
      this.localDataSource1 = []
      this.axios.get('http://10.10.11.33/Home/MaterialGrpSearch').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource1.push(res.data[i])
        }
        $('#grid1').data('kendoGrid').dataSource.read()
      })
      this.localDataSource2 = ''
      this.getMaterialGrpSubData()
    },
    getMaterialGrpSubData () {
      this.localDataSource2 = []
      this.axios.get('http://10.10.11.33/Home/MaterialSubGrpSearch?grpCd=' + this.selectedGrp).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource2.push(res.data[i])
        }
        $('#grid2').data('kendoGrid').dataSource.read()
      })
    },
    showAddDialog1 () {
      this.$modal.show(invgroupAdd, {
        grpAdd: this.arrSelected
      },
      {
        name: 'modal1',
        width: '400px',
        height: '200px',
        draggable: true
      }
      )
    },
    showAddDialog2 (isSelect) {
      if (isSelect === false) {
        this.arrSelected2 = ''
        this.$modal.show(invgroupSubAdd, {
          grpSubAdd: this.grpCode
        },
        {
          name: 'modal1',
          width: '400px',
          height: '200px',
          draggable: true
        }
        )
      } else {
        // this.arrSelected2 = ''
        this.$modal.show(invgroupSubAdd, {
          grpSubAdd: this.arrSelected2
        },
        {
          name: 'modal1',
          width: '400px',
          height: '200px',
          draggable: true
        }
        )
      }
    },
    onChange (ev) {
      var tmpSelectedGrp = ''
      this.arrSelected = $.map(ev.sender.select(), function (item) {
        var strItem = ''
        var i = 0
        $(item).find('td').each(function () {
          strItem += $(this).text() + ','
          i++
          if (i === 1) {
            tmpSelectedGrp = $(this).text()
          } else if (i === 3) {
            i = 0
          }
        })
        return strItem
      })
      this.selectedGrp = tmpSelectedGrp
      this.grpCode = this.arrSelected
      this.getMaterialGrpSubData()
    },
    onChangeSub (ev) {
      this.arrSelected2 = $.map(ev.sender.select(), function (item) {
        var strItem = ''
        $(item).find('td').each(function () {
          strItem += $(this).text() + ','
        })
        return strItem
      })
      this.showAddDialog2(true)
    }
  },
  watch: {
  }
}
</script>
<style>
</style>
