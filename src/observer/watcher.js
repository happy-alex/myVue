import Dep from './dep';

/**
 * 订阅者，在依赖收集的时候会把watcher通过addSub的方式添加到Dep维护的sub数组中
 * 当$options.data变化的时候，通过触发Dep的notify方法，通知所有的Watcher对象去修改视图
 */
class Watcher {
    constructor(vm, cb) {
        this.vm = vm;
        this.cb = cb;

        // 只有被target标记过的才能依赖收集
        Dep.target = this;

        // 第一次触发渲染操作，进行依赖收集
        this.update();
        Dep.target = null;
    }

    update() {
        this.cb.call(this.vm);
    }
}

export default Watcher;