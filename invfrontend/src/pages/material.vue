<template>
  <div style="width:85%; height:100%; position:fixed">
    <div style="height:10%; width:85%">
        <h1>
            {{title}}
        </h1>
    </div>
    <div style="height:100%; width:85%;">
        <div class="btn">
            <button @click="showAddDialog" id="btnAdd">등록</button>
            <button @click="getMaterialData" id="btnSearch">조회</button>
        </div>
        <div style="float:left;">
          자재명 : <input v-on:keyup.enter="getMaterialData" v-model="material" type="text" id="matNm"/>
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
      this.axios.get('http://10.10.11.98/Home/MaterialSearch?matNm=' + this.material).then(res => {
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
        $(item).find('td').each(function () {
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
<style scoped>
    .btn button{
        float: right;
        background: white;
        border-color:black;
        width: 80px;
    }
</style>
