// reactive()响应式对象
import { reactive } from "vue";
import { todayPost, thisWeek, thisMonth } from '@/moke'
import { Post } from '@/types';

/**
 * 标准数据库格式id作为key
 * posts:{
 * 1: {id: 1, title:"今天", .....}
 * 2: {id: 1, title:"今天", .....}
 * 3: {id: 1, title:"今天", .....}
 * }
 * */
interface PostsState {
    ids: string[],
    // Record把string转换成Post
    all: Record<string, Post>,
    loader: boolean
}
// 返回值类型PostsState
const initialPostsState = (): PostsState => ({
    ids: [
        todayPost.id.toString(),
        thisWeek.id.toString(),
        thisMonth.id.toString(),
    ],
    all: {
        [todayPost.id] : todayPost,
        [thisWeek.id] : thisWeek,
        [thisMonth.id] : thisMonth,
    },
    loader: false
})

interface State { 
    posts: PostsState
}

const initalState = (): State => ({
    posts: initialPostsState()
})

class Store {
    protected state: State;

    constructor(initalState: State) {
        this.state = reactive(initalState)
    }
    public getState(): State {
        return this.state
    }
}

const store = new Store(initalState());

store.getState();

export const userStore = () => store