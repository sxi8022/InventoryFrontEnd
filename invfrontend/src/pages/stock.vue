<template>
  <div style="width:85%; height:100%; position:fixed">
    <div style="height:10%; width:85%">
        <h1>
            {{title}}
        </h1>
    </div>
    <div style="height:100%; width:85%;">
        <div class="btn">
            <button @click="getStockData" id="btnSearch">조회</button>
        </div>
        <div style="float:left;">
          자재명 : <input v-on:keyup.enter="getStockData" v-model="material" type="text" id="matNm"/>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="grid" :data-source="localDataSource" :height="500"
                              :columns="columns" :selectable="true">
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
      this.axios.get('http://10.10.11.98/Home/StockSearch?matNm=' + this.material).then(res => {
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
<style scoped>
    .btn button{
        float: right;
        background: white;
        border-color:black;
        width: 80px;
    }
</style>
