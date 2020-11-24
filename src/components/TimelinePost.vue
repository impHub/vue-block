<template>
  <a
    data-test="post"
    class="panel-block"
  >
    <div>
      <a>{{ post.title }}</a>
      <div>{{ post.created }}</div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Period, Post } from "@/types";
export default defineComponent({
  name: "TimelinePost",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup() {},
});
</script>

<style>
</style>
