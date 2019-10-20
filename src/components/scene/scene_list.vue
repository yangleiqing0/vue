<template>
  <MyTable table_name="scene" ref="child" :tree_props="tree">
      <el-table-column show-overflow-tooltip
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column show-overflow-tooltip
        prop="group_id"
        sortable=""
        label="分组名称">
         <template slot-scope="scope">
         <span v-for="group in $refs.child.groups" v-if="scope.row.group_id === group.id">{{group.name}}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
        sortable=""
        prop="name"
        label="场景名称">
      </el-table-column>
  </MyTable>
</template>


<script>
  export default {
     name:'scene_list',
      data() {
         return {
             tree: {children: 'children', hasChildren: 'hasChildren'}
         }
      }
  }
</script>
<style scoped>

</style>
