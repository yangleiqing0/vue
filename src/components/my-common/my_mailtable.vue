<template>
  <table class="mailTable" :style="styleObject" v-if="s_showByRow">
    <tr v-for="index in rowCount">
      <td class="column" >{{tableData[index*3-3].key}}</td>
      <td>{{tableData[index*3-3].value}}</td>
      <td class="column">{{tableData[index*3-2] !== undefined ? tableData[index*3-2].key : ''}}</td>
      <td>{{tableData[index*3-2] !== undefined ? tableData[index*3-2].value : ''}}</td>
      <td class="column">{{tableData[index*3-1] !== undefined ? tableData[index*3-1].key : ''}}</td>
      <td>{{tableData[index*3-1] !== undefined ? tableData[index*3-1].value : ''}}</td>

    </tr>
  </table>
  <table class="mailTable" :style="styleObject" v-else>
    <tr v-for="index in rowCount">
      <td class="column">{{tableData[index-1].key}}</td>
      <td>{{tableData[index-1].value}}</td>
      <td class="column">{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : ''}}</td>
      <td>{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : ''}}</td>
    </tr>
  </table>
</template>

<script>
export default {
    name:'mail_table',
  data() {
    return {
      styleObject: {},
      s_showByRow: true,
    };
  },
  props: ['tableData', 'tableStyle', 'showByRow'],
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length/3);
    }
  },
  created() {
    this.styleObject = this.tableStyle;
    if(this.showByRow !== undefined){
      this.s_showByRow = this.showByRow;
    }
  },
}
</script>


<style >
/*　　.mailTable, .mailTable tr, .mailTable tr td{ border:1px solid #E6EAEE; }*/
/*　　.mailTable tr td{ border:1px solid #E6EAEE; width: 150px; height: 35px; line-height: 35px; box-sizing: border-box; padding: 0 10px; }*/
/*　　.mailTable tr td.column {*/
/*  background-color: #EFF3F6; color: #393C3E;*/
/*}*/
table{
  box-shadow: unset!important;
}
  .column{
    font-weight: 800
  }
  .mailTable>td, .mailTable>tr{
    text-align: left;
    font-size: 16px;
    color: #f8f8f8;
  }
</style>
