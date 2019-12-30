<template>
  <div style="width:85%; height:100%; position:fixed">
    <div class="row mt-1 mb-2">
      <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10 d-flex justify-content-center" style="height:10%; width:100%">
        <h1>
          {{title}}
        </h1>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
      </div>
    </div>
    <div style="height:100%; width:85%;">
      <div id="search" class="row">
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10 d-flex justify-content-center pl-5">
          <div>
               자재명 : <input v-on:keyup.enter="getMaterialData" v-model="material" type="text" id="matNm"/>
          </div>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
          <!-- mt, mr 마진 속성 -->
          <div class="btn-group float-right mt-2">
            <button @click="showAddDialog" id="btnAdd" class="btn btn-primary mr-1">등록</button>
            <button @click="getMaterialData" id="btnSearch" class="btn btn-primary">조회</button>
          </div>
        </div>
      </div>
      <br/><br/><br/>
      <div>
      <kendo-grid @change="onChange" id="grid" :data-source="localDataSource" :height="500"
                            :columns="columns" :selectable="true">
      </kendo-grid>
      </div>
    </div>
    <modals-container v-on:close="getMaterialData"/>
  </div>
</template>
<script>
// import { Post } from '../api/index'
// const ApiDefault = {
//   url: 'http://10.10.11.98/'
// }
// ApiDefault.instance = this.axios.create({ baseURL: ApiDefault.url })
import materialAdd from './materialAdd.vue'
export default {
  data () {
    return {
      title: '자재 마스터',
      localDataSource: [],
      material: '',
      columns: [
        { field: 'matNo', title: '자재번호', hidden: true },
        { field: 'grpCd', title: '그룹코드', hidden: true },
        { field: 'subGrpCd', title: '서브그룹코드', hidden: true },
        { field: 'matNm', title: '자재명' },
        { field: 'itemNo', title: '품번' },
        { field: 'grpNm', title: '자재그룹명' },
        { field: 'subGrpNm', title: '자재소그룹명' },
        { field: 'rmk', title: '비고' }
      ],
      selected: ''
    }
  },
  components: {
    materialAdd
  },
  mounted () {
    // const response = await ApiDefault.instance.get('')
    // console.log(response.data)
    this.getMaterialData()
  },
  methods: {
    getMaterialData () {
      this.localDataSource = []
      this.axios.get('http://10.10.11.98:801/api/Material/' + this.material).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource.push(res.data[i])
        }
        $('#grid').data('kendoGrid').dataSource.read()
      })
      this.selected = ''
    },
    showAddDialog () {
      console.log(this.selected)
      this.$modal.show(materialAdd, {
        matAdd: this.selected
      },
      {
        name: 'modal',
        width: '800px',
        height: '400px',
        draggable: true
      }
      )
    },
    onChange (ev) {
      this.selected = $.map(ev.sender.select(), function (item) {
        var strItem = ''
        $(item).find('td').each(function (index) {
          strItem += $(this).text() + ','
        })
        strItem = strItem.substr(0, strItem.length - 1)
        return strItem
      })
      this.showAddDialog()
    }
  },
  watch: {
  }
}
</script>
<style>
</style>
