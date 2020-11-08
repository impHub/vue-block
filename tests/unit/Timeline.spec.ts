import { mount } from "@vue/test-utils";
import Timeline from "@/components/Timeline.vue";
import { nextTick } from 'vue';

describe("Timeline.vue", () => {
  it("三个a标签", () => {
    const wrapper = mount(Timeline);
    // expect要测试的内容 toBe期望测试的结果 expect(1).toBe(2) //true
    expect(wrapper.html());
    console.log(wrapper.html());
    const periods = wrapper.findAll("a");
    expect(periods.length).toBe(3); // expect(wrapper.findAll("a").toHaveLength(3))
    expect(wrapper.findAll("a")).toHaveLength(3);
    // 取标签上自定义属性
    expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3);
  });
  it("a标签事件功能", async () => {
    const wrapper = mount(Timeline);
    const $today = wrapper.findAll('[data-test="period"]')[0];
    console.log($today.classes());
    // toBe期望; toContain包含
    expect($today.classes()).toContain("is-active"); //第一个标签是否有默认被选中class
    const $thisWeek = wrapper.findAll('[data-test="period"]')[1];
    await $thisWeek.trigger('click');//直接触发事件
    // dom更新完毕
    // await nextTick();
    expect($today.classes()).not.toContain("is-active");// 不包含
    expect($thisWeek.classes()).toContain("is-active");// 触发事件后的class
   
    const $thisMonth = wrapper.findAll('[data-test="period"]')[2];
    await $thisMonth.trigger('click');//直接触发事件
    // dom更新完毕
    // await nextTick();
    expect($thisWeek.classes()).not.toContain("is-active");// 不包含
    expect($thisMonth.classes()).toContain("is-active");// 触发事件后的class
  });
});
