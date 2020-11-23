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
    ids: string[], //id
    // Record<把string, 转换成Post>
    all: Record<string, Post>,
    loaded: boolean,
}

const initialState = ():PostsState => ({
    ids: [],
    all: {},
    loaded: false
})

interface State { }

class Store {
    // 被保护的
    protected state: State;

    constructor(initialState: State) {
        this.state = reactive(initialState);
    }
    // 公开的方法
    public getState(): State {
        return this.state
    }
}

const store = new Store({ 1: { id: 1, title: '今天' } })
store.getState();

export const useStore = () => store