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
    <TimelinePost
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Period, Post } from "@/types";
import { todayPost, thisWeek, thisMonth } from "@/moke";
import moment from "moment";
import TimelinePost from "./TimelinePost.vue";
import { useStore } from "@/store";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export default defineComponent({
  components: {
    TimelinePost,
  },
  async setup() {
    const store = useStore();
    console.log(store.getState());

    // const storeIds = store.getState().posts.ids;
    // console.log(storeIds, "id");

    // console.log(store.getState().posts.ids.reduce<Post>);
    // storeIds.reduce<Post[]>((acc, id) => {
    //   console.log(acc, id);

    //   const post = store.getState().posts.all[id];
    //   return acc.concat(post);
    // }, []);
    const periods: Period[] = ["今天", "本周", "本月"];
    // 当前被选中的值
    const selectedPeriod = ref<Period>("今天");
    // tab切换
    const setPeriod = (val: Period) => {
      selectedPeriod.value = val;
      console.log(posts);
    };
    // 会阻塞页面两秒后页面显示数据
    await delay(2000);
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
