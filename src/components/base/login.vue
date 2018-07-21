<template>
  <div class="login">
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="login_form">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">登陸</Button>
    </FormItem>
  </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "請輸入賬號",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "請輸入密碼",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密碼長度不能少於6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$router.push('/')
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style scoped>
  .login{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url("http://img95.699pic.com/photo/50053/9342.jpg_wh300.jpg");
    background-size: 100% 100%;
  }
  .login_form{

  }
</style>
