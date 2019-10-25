<template>
  <div>
    <a-input-search style="width: 200px;" placeholder="输入搜索内容" enterButton></a-input-search>
    <a-button type="link" class="editable-add-btn" @click="handleEdit">编辑</a-button>
    <a-button type="link" class="editable-add-btn" @click="handleAdd">新增</a-button>
    <a-button type="link"  @click="handleSave">保存</a-button>
    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell :editable="editable" :text="text" @change="onCellChange(record.key, 'name', $event)"/>
      </template>
<!--

      <template slot="age" slot-scope="text, record">
        <editable-cell :editable="editable" :text="text" @change="onCellChange(record.key, 'age', $event)"/>
      </template>


      <template slot="address" slot-scope="text, record">
        <editable-cell :editable="editable" :text="text" @change="onCellChange(record.key, 'address', $event)"/>
      </template>
-->

      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
  import EditableCell from './EditableCell'
  /*
  * EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
  */
  export default {
    components: {
      EditableCell,
    },
    data () {
      return {
        editable:false,
        dataSource: [{
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        }, {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        }],
        count: 2,
        columns: [{
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' },
        }, {
          title: 'age',
          dataIndex: 'age',
          scopedSlots: { customRender: 'age' },
        }, {
          title: 'address',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' },
        }, {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        }],
      }
    },
    methods: {
      handleSave(){
        console.log(this.dataSource)
        this.editable = false
      },
      handleEdit(){
        this.editable = true
      },
      onCellChange (key, dataIndex, value) {
        console.log(value)
        const dataSource = [...this.dataSource]
        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource = dataSource
        }
      },
      onDelete (key) {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
      },
      handleAdd () {
        this.editable = true
        const { count, dataSource } = this
        const newData = {
          key: count,
          name: ``,
          age: ``,
          address: ``,
        }
        this.dataSource = [...dataSource, newData]
        this.count = count + 1
      },
    },
  }
</script>
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
