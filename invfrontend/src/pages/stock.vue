<template>
  <div style="width:85%; height:100%; position:fixed">
    <div style="height:10%; width:85%">
      <div class="row mt-1 mb-2">
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10 d-flex justify-content-center" style="height:10%; width:100%">
          <h1>
            {{title}}
          </h1>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
        </div>
      </div>
    </div>
    <div style="height:100%; width:85%;">
      <div id="search" class="row">
        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-10 d-flex justify-content-center pl-5">
          <div>
            자재명 : <input v-on:keyup.enter="getStockData" v-model="material" type="text" id="matNm"/>
          </div>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
          <div class="btn-group float-right mt-2">
            <button @click="getStockData" id="btnSearch" class="btn btn-primary">조회</button>
          </div>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="grid" :data-source="localDataSource" :height="500"
                              :columns="columns" :selectable="true">
        </kendo-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Post } from '../api/index'
// const ApiDefault = {
//   url: 'http://10.10.11.33/'
// }
// ApiDefault.instance = this.axios.create({ baseURL: ApiDefault.url })
import materialAdd from './materialAdd.vue'
export default {
  data () {
    return {
      title: '재고',
      localDataSource: [],
      material: '',
      columns: [
        { field: 'matNo', title: '자재번호', hidden: true },
        { field: 'matNm', title: '자재명' },
        { field: 'itemNo', title: '품번' },
        { field: 'stockCnt', title: '재고개수' }
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
    this.getStockData()
  },
  methods: {
    getStockData () {
      this.localDataSource = []
      this.axios.get('http://10.10.11.33/Home/StockSearch?matNm=' + this.material).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.localDataSource.push(res.data[i])
        }
        $('#grid').data('kendoGrid').dataSource.read()
      })
      this.selected = ''
    }
  },
  watch: {
  }
}
</script>
<style>
</style>
