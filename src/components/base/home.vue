<template>
  <Layout>
    <Sider hide-trigger>
      <sidebar></sidebar>
    </Sider>
    <Layout>
      <Header>
        <navbar></navbar>
      </Header>
      <Content style="padding:10px">
        <router-view/>
      </Content>
      <!-- <Footer><router-link to="tobaccobase">aaqa</router-link></Footer> -->
    </Layout>
  </Layout>
  <!-- <Row>
    <Col :xs="3" :sm="3" :md="3" :lg="3">
      <sidebar></sidebar>
    </Col>

    <Col :xs="21" :sm="21" :md="21" :lg="21">
      <Row>
      <navbar></navbar>
        <div style="padding: 10px">
          <router-view/>
        </div>
      </Row>
    </Col>
    <router-link to="sidebar">aaa</router-link>
    <router-link to="login">aaa</router-link>
    <router-link to="navbar">aaa</router-link>

  </Row> -->
</template>

<script>
import sidebar from "../base/sidebar.vue";
import navbar from "../base/navbar.vue";

export default {
  components: {
    sidebar,
    navbar
  }
};
</script>

<style scoped>
</style>
