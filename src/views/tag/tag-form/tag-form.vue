<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标签名：">
        <el-input v-model="form.tagName"></el-input>
      </el-form-item>
      <el-form-item label="value：">
        <el-input v-model="form.tagValue"></el-input>
      </el-form-item>
    </el-form>

    <div class="bottom-button">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { _getTagList, _createTagItem } from '@/service/tag'
export default {
  name: 'tagForm',
  data () {
    return {
      form: {
        tagName: '',
        tagValue: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const queryParams = {
        tagName: this.form.tagName,
        tagValue: this.form.tagValue
      }
      try {
        await _createTagItem({queryParams})
        this.$notify({
          title: '成功',
          message: '新建分类成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            name: "tagList"
          })
        }, 1500)
      } catch (err) {
        console.log(err)
      }
    },
    handleCancel () {
      history.go(-1)
    },
    async queryArticle (id) {
      const queryParams = {
        title: this.queryTitle,
        limit: this.limit,
        offset: this.offset,
        id: id
      }
      const res = await _getTagList({queryParams})
      this.form = res.list[0]
    }
  },
  beforeMount () {
    if (this.$route.name === 'tagEdit') {
      this.queryArticle(this.$route.params.tagId)
    } else {
      this.form = {}
    }
  }
}
</script>
<style lang="sass" scoped>
.bottom-button
  float: right
</style>
