<template>
  <section class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <Timeline />
        </template>
        <!-- 组件渲染前 -->
        <template #fallback>
          <progress class="progress is-primary is-small">
            加载中....
          </progress>
        </template>
      </Suspense>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "./components/Timeline.vue";
export default defineComponent({
  name: "App",
  components: {
    Timeline,
  },
});
</script>

<style>
</style>
