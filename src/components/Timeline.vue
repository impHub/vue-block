<template>
  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a
        @click="setPeriod(itme)"
        :class="[itme === selectedPeriod ? 'is-active' : '']"
        data-test="period"
        v-for="(itme, index) in periods"
        :key="index"
      >
        {{ itme }}
      </a>
    </p>
    <a v-for="post in posts" :key="post.id" class="panel-block">
      <div>
        <a>{{ post.title }}</a>
        <div>{{ post.created }}</div>
      </div>
    </a>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Period, Post } from "@/types";
import { todayPost, thisWeek, thisMonth } from "@/moke";
import moment from "moment";
export default defineComponent({
  setup() {
    const periods: Period[] = ["今天", "本周", "本月"];
    // 当前被选中的值
    const selectedPeriod = ref<Period>("今天");
    // tab切换
    const setPeriod = (val: Period) => {
      selectedPeriod.value = val;
      console.log(posts);
    };
    // 展示数据
    // const posts: Post[] = [todayPost, thisWeek, thisMonth]
    const posts = computed(() => {
      return [todayPost, thisWeek, thisMonth].filter((post) => {
        // 等于今天 并且在24小时内
        if (
          selectedPeriod.value === "今天" &&
          post.created.isAfter(moment().subtract(1, "day"))
        ) {
          return true;
        } 
        // 
        if (
          selectedPeriod.value === "本周" &&
          post.created.isAfter(moment().subtract(7, "days"))
        ) {
          return true;
        } 
        //
        if (
          selectedPeriod.value === "本月" &&
          post.created.isAfter(moment().subtract(1, "month"))
        ) {
          return true;
        } 
        return false;
      });
      
    });
    return { periods, selectedPeriod, setPeriod, posts };
  },
});
</script>

<style>
</style>
