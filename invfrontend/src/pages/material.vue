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
        <kendo-grid :data-source="localDataSource"
                :selectable="'multiple cell'"
                :sortable="true"
                :filterable="true"
                :groupable="true"
                v-on:change="onChange"
                v-on:databinding="onDataBinding"
                v-on:databound="onDataBound"
                v-on:sort="onSorting"
                v-on:filter="onFiltering"
                v-on:group="onGrouping"
                v-on:groupexpand="onGroupExpand"
                v-on:groupcollapse="onGroupCollapse">
        </kendo-grid>
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
