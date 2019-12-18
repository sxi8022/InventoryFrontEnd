<template>
    <div>
        <div class="btn">
            <button>닫기</button>
            <button>저장</button>
        </div>
    </div>
</template>

<script>

export default {
  data: () => ({
  }),
  props: ['matAdd'],
  methods: {
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
    .btn button{
        float: right;
        background: white;
        border-color:black;
        width: 80px;
    }
</style>
