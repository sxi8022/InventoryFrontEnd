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
        <kendo-grid id="grid" :data-source="localDataSource" :height="500"
                              :columns="columns">
        </kendo-grid>
        </div>
    </div>
    <modals-container/>
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
        { field: 'matNm', title: '자재명' },
        { field: 'itemNo', title: '품번' },
        { field: 'grpNm', title: '자재그룹명' },
        { field: 'subGrpNm', title: '자재소그룹명' },
        { field: 'rmk', title: '비고' }
      ]
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
    async getMaterialData () {
      console.log(this.localDataSource)
      console.log('http://10.10.11.98/Home/MaterialSearch?matNm=' + this.material)
      this.localDataSource = []
      await this.axios.get('http://10.10.11.98/Home/MaterialSearch?matNm=' + this.material).then(async res => {
        console.log(this.localDataSource)
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource.push(res.data[i])
        }
        await $('#grid').data('kendoGrid').dataSource.read()
      })
    },
    showAddDialog () {
      this.$modal.show(materialAdd, {
        matAdd: 'data',
        modal: this.$modal
      },
      {
        name: 'modal',
        width: '800px',
        height: '400px',
        draggable: true
      }
      )
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
