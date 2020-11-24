/**
 * 标准数据库格式id作为key
 * posts:{
 * 1: {id: 1, title:"今天", .....}
 * 2: {id: 1, title:"今天", .....}
 * 3: {id: 1, title:"今天", .....}
 * }
 * */
// 自定义状态管理

import { reactive } from "vue";
import { todayPost, thisWeek, thisMonth } from '@/moke'
import { Post } from '@/types';
import axios from 'axios'
// state类型
interface State {
    posts: PostsState
}
// 传参类型
interface PostsState {
    ids: string[],
    // Record把string转换成Post
    all: Record<string, Post>,
    // 开关控制
    loaded: boolean
}
class Store {
    // 被保护的值state
    protected state: State;
    constructor(initialState: State) {
        this.state = reactive(initialState)
    }

    public getState(): State {
        return this.state
    }
    async fetchPosts() {
        const response = await axios.get<Post[]>("/posts")
        // 处理数据
        const ids: string[] = [];
        const all: Record<string, Post> = {};
        for (const post of response.data) {
            ids.push(post.id.toString());
            all[post.id] = post
        }
        this.state.posts = {
            ids, all, loaded: true
        }
    }
}
// 传递的参数
const initialPostsState = (): PostsState => ({
    ids: [
        todayPost.id.toString(),
        thisWeek.id.toString(),
        thisMonth.id.toString()
    ],
    all: {
        [todayPost.id]: todayPost,
        [thisWeek.id]: thisWeek,
        [thisMonth.id]: thisMonth
    },
    loaded: false
})
// 最后传递的参数
const initialState = (): State => ({
    posts: initialPostsState()
})
const store = new Store(initialState())

export const useStore = () => store;