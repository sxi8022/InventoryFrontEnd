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
            <button @click="getMaterialData" id="btnSearch">조회</button>
        </div>
        <div>
          자재명 : <input v-model="material" type="text" id="matNm"/>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="grid" :data-source="localDataSource" :height="500">
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
      title: '자재 조회',
      localDataSource: [],
      material: ''
    }
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
