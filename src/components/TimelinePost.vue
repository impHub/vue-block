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
import { computed, defineComponent, ref } from "vue";
import { Period, Post } from "@/types";
import { todayPost, thisWeek, thisMonth } from "@/moke";
import moment from "moment";
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
