// 定义一个依赖收集的类
class Dep {
    constructor() {

        // 每个元素为一个Watcher实例
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        remove(this.subs, sub);
    }

    // 触发依赖的回调
    notify() {
        const arr = this.subs.slice();
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            arr[i].update();
        }
    }
}

function remove(arr, item){
    if (!arr.length) {
        return;
    }
    const pos = arr.indexOf(item);
    (pos > -1) && arr.splice(pos, 1);
}

export default Dep;