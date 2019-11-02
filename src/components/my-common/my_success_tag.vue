<template>
    <p v-if="scope.row['testcase_id']" :key="scope.row.id">{{scope.row[result]}}</p>
    <el-tag v-else-if="scope.row[result] === '测试成功'" :key="scope.row.id" type="success">测试成功</el-tag>
    <p v-else-if="!scope.row[result]"></p>
    <el-tag v-else :key="scope.row.id" type="danger">{{scope.row[result]}}</el-tag>
</template>

<script>
    export default {
        name: "my_success_tag",
        props:['scope', 'result']
    }
</script>

<style scoped>

</style>
