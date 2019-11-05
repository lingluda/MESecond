<template>
  <a-table :columns="columns" :dataSource="data" >
    <a-table
      slot="expandedRowRender"
      slot-scope="text"
      :columns="innerColumns"
      :dataSource="innerData"
      :pagination="false"
    >
    </a-table>
  </a-table>
</template>
<script>
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  const innerColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', key: 'state', scopedSlots: { customRender: 'status' } },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  ];

  const innerData = [];
  for (let i = 0; i < 3; ++i) {
    innerData.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }

  export default {
    data() {
      return {
        data,
        columns,
        innerColumns,
        innerData,
      };
    },
  };
</script>
