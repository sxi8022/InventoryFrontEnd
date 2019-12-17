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
            <button id="btnSearch">조회</button>
        </div>
        <br/><br/><br/>
        <div>
        <kendo-grid id="grid" :data-source="localDataSource">
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
      localDataSource: [{
        'K': 1,
        'V': 2
      }
      ]
    }
  },
  async mounted () {
    // const response = await ApiDefault.instance.get('')
    // console.log(response.data)
    console.log(this.localDataSource)
    await this.axios.get('http://10.10.11.98/').then(async res => {
      console.log(this.localDataSource)
      this.localDataSource[0].K = res.data[0].Key
      this.localDataSource[0].V = res.data[0].Value
      await $('#grid').data('kendoGrid').dataSource.read()
    })
  },
  methods: {
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
