<template>
  <div class="editable-cell">
    <div
      v-if="editable"
      class="editable-cell-input-wrapper"
    >
      <a-input
        :value="value"
        @change="handleChange"
        @pressEnter="check"
      /><a-icon
      type="check"
      class="editable-cell-icon-check"
      @click="check"
    />
    </div>
    <div
      v-else
      class="editable-cell-text-wrapper"
    >
      {{ value || ' ' }}
      <a-icon
        type="edit"
        class="editable-cell-icon"
        @click="edit"
      />
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      text: String,
      editable:Boolean,

    },
    data () {
      return {
        value: this.text,
        // editable: false,
      };
    },
    methods: {
      handleChange (e) {
        const value = e.target.value;
        this.value = value;
        console.log(this.value)
      },
      check () {
        this.$emit('change', this.value);
      },
      edit () {
        this.editable = true;
      },
    },
  };
</script>
