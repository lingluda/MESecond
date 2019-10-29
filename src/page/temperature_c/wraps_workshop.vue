<template>
    <div>
      <Table :columns="columns8" :data="data7" size="small" ref="table"></Table>
      <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
      <div>
        <a-button type="primary">Primary</a-button>
      </div>
      <div style="display: flex;width: 100%">
        <div style="width: 5%;border: 1px solid #d4d4d4;height: 98vh">
          <div style="margin:45vh 0 0 45%;font-weight: bold">制<br>丝<br>办<br>公<br>辅<br>料<br>房</div>
        </div>

        <div style="flex-grow: 1;border: 1px solid #d4d4d4;width: 50%">
            <div style="display: flex;justify-content: space-between;padding: 5px">
              <bwtt></bwtt>
              <span>掺兑加香区ZK9</span>
              <bwtt></bwtt>
            </div>
          <div style="display: flex;justify-content: space-around">
           <list_components></list_components>
           <list_components></list_components>
           <list_components></list_components>
           <list_components></list_components>
          </div>
          <div style="display: flex">
            <div style="display: flex;border: 1px solid #d4d4d4;width: 50%;justify-content: space-between">
              <bwtt></bwtt>
              <span>掺兑加香区ZK9</span>
              <bwtt></bwtt>
            </div>
            <div style="display: flex;border: 1px solid #d4d4d4;width: 50%">1</div>
          </div>
        </div>

        <div style="flex-grow: 1;border: 1px solid #d4d4d4;width: 50%">
          <div style="display: flex;justify-content: space-between;padding: 5px">
            <div>
              <bwtt></bwtt>
            </div>
            <div>掺兑加香区ZK9</div>
            <div>
              <bwtt></bwtt>
            </div>
          </div>
        </div>

        <div style="width: 5%;border: 1px solid #d4d4d4">
          <div style="margin:45vh 0 0 45%;font-weight: bold">高<br>架<br>库</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      components:{
        list_components:resolve => require(["@/page/temperature_c/temperature/wcontent.vue"], resolve),
        bwtt:resolve => require(["@/page/temperature_c/temperature/bwtt.vue"], resolve),
      },
      data(){
        return{
          columns8: [
        {
          title: 'Name',
            key: 'name',
          align: 'center',
          width: 200,
          fixed: 'left',
          filters: [
          {
            label: 'Joe',
            value: 1
          },
          {
            label: 'John',
            value: 2
          }
        ],
          filterMultiple: false,
          filterMethod (value, row) {
          if (value === 1) {
            return row.name === 'Joe';
          } else if (value === 2) {
            return row.name === 'John Brown';
          }
        }
        },
        {
          title: 'Other',
            align: 'center',
          children: [
          {
            title: 'Age',
            key: 'age',
            align: 'center',
            width: 200,
            sortable: true
          },
          {
            title: 'Address',
            align: 'center',
            children: [
              {
                title: 'Street',
                key: 'street',
                align: 'center',
                width: 200
              },
              {
                title: 'Block',
                align: 'center',
                children: [
                  {
                    title: 'Building',
                    key: 'building',
                    align: 'center',
                    width: 200,
                    sortable: true
                  },
                  {
                    title: 'Door No.',
                    key: 'door',
                    align: 'center',
                    width: 200
                  }
                ]
              }
            ]
          }
        ]
        },
        {
          title: 'Company',
            align: 'center',
          children: [
          {
            title: 'Company Address',
            key: 'caddress',
            align: 'center',
            width: 200
          },
          {
            title: 'Company Name',
            key: 'cname',
            align: 'center',
            width: 200
          }
        ]
        },
        {
          title: 'Gender',
            key: 'gender',
          align: 'center',
          width: 200,
          fixed: 'right'
        }
      ],
        data7: []
      }
      },
      mounted () {
        const data = [];
        for (let i = 0; i < 20; i++) {
          data.push({
            key: i,
            name: '读不懂',
            age: i + 1,
            street: '为还没',
            building: 'C',
            door: 2035,
            caddress: '执行消息',
            cname: '完全',
            gender: '难啊难',
          });
        }
        this.data7 = data;
      },
      methods: {
        exportData (type) {
          if (type === 1) {
            this.$refs.table.exportCsv({
              filename: 'The original data'
            });
          } else if (type === 2) {
            this.$refs.table.exportCsv({
              filename: 'Sorting and filtering data',
              original: false
            });
          } else if (type === 3) {
            this.$refs.table.exportCsv({
              filename: 'Custom data',
              columns: this.columns8.filter((col, index) => index < 4),
              data: this.data7.filter((data, index) => index < 4)
            });
          }
        }
      }
    }
</script>

<style scoped>

</style>
