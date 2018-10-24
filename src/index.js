import Dep from './observer/dep';
import Watcher from './observer/watcher';

export default class Vue {
    constructor(options) {
        this._options = options || {};
        this._data = this._options.data;
        this._render = this._options.render || this.render;

        observe(this._data, this._render);
        _proxy.call(this, this._data);

        // 编译html，每一个双向绑定的节点都要生成一个watcher
        let watcher = new Watcher(this, this._render);
    }

    render() {

        // 这里做diff，判断是否要重新渲染
        console.log('update page')
    }
}


// 代理vue实例的_data
function _proxy(data) {
    var self = this;
    Object.keys(data).forEach(key => {
        Object.defineProperty(self, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                return self._data[key];
            },
            set: newValue => {
                self._data[key] = newValue;
            }
        })
    });
}

// 将数据变为可观察的
function observe(obj, cb) {
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key], cb);
    });
}

// 劫持数据变化
function defineReactive(obj, key, value, cb) {
    console.log('define', obj)

    // 这里形成了一个闭包
    // 依赖收集，针对每一个key，都新建一个Dep对象，保存所有对key的依赖
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,

        // 进行依赖收集
        get: () => {

            // 将收集到的依赖通过addSub添加到dep.subs上, 只有被Dep.target标记过的才可以依赖收集 TODO...
            Dep.target && dep.addSub(Dep.target);
            return value;
        },

        // 观察者，设置watcher, 触发更新回调
        set: newValue => {
            value = newValue;
            cb && cb();

            // 修改了obj.key, 手动触发dep.subs中所有watcher的更新
            dep.notify();
        }
    })
}

/**
 * 在template初始化render过程中，只有被Dep.target标记过的才能进行依赖收集
 * 在$options.data被修改时，会触发setter操作，dep会调用subs中Watcher实例的update方法，进行渲染更新。
 */


