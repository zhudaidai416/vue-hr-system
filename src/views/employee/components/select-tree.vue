<template>
  <el-cascader
    :value="value"
    size="mini"
    separator="-"
    clearable
    filterable
    :options="treeData"
    :props="props"
    @change="handleChange"
  />
</template>

<script>
import { transListToTree } from '@/utils/index'
import { getDepartmentList } from '@/api/department'
export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      treeData: [],
      props: {
        label: 'name',
        value: 'id',
        expandTrigger: 'hover' // 展开方式
      }
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      this.treeData = transListToTree(await getDepartmentList(), 0)
    },
    handleChange(value) {
      if (value.length > 0) {
        this.$emit('input', value[value.length - 1]) // 将最后一位的id传到v-model
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style scoped></style>
