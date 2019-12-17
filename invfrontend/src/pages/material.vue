<template>
  <div style="width:100%; height:100%; position:fixed">
    <div style="height:10%; width:100%">
        <h1>
            {{title}}
        </h1>
    </div>
    <div style="height:100%; width:100%;">
        <div class="btn">
            <button id="btnAdd">등록</button>
            <button id="btnSearch">조회</button>
        </div>
        <div id="grid">
        </div>
    </div>
  </div>
</template>
<script>
// import { Post } from '../api/index'
export default {
  data () {
    return {
      title: '자재 조회'
    }
  },
  created () {
    this.axios.get('http://10.10.11.98/').then(res => {
      console.log(res.data)
    })
  },
  mounted () {
    var products = [{
      ProductID: 11,
      ProductName: 'Chai'
    }, {
      ProductID: 22,
      ProductName: 'Chang'
    }, {
      ProductID: 33,
      ProductName: 'Aniseed Syrup'
    }, {
      ProductID: 44,
      ProductName: "Chef Anton's Cajun Seasoning"
    }, {
      ProductID: 55,
      ProductName: "Chef Anton's Gumbo Mix"
    }]
    $('#abc').kendoGrid({
      dataSource: {
        data: products,
        schema: {
          model: {
            id: 'ProductID',
            fields: {
              ProductName: {
                type: 'string'
              }
            }
          }
        },
        pageSize: 10
      },
      toolbar: ['create'],
      sortable: true,
      filterable: true,
      pageable: true,
      columns: [
        { field: 'ProductID', title: 'ProductID' },
        { field: 'ProductName', title: 'ProductName' },
        { command: 'destroy', title: '&nbsp;' }
      ],
      editable: true
    })
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
