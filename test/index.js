// demo

var vm = new Vue({
    el: '',
    data: {
        value: 'old value'
    },
    props: [],
    computed() {

    },
    methods: {

    },

    render(){
        console.log('render vm', this.value)
    }
});

console.log(1111,'sleep start')
const start = Date.now();
const t =start+4000;
while(Date.now()<t){}
console.log('sleep', Date.now()-start)
vm.value = 'new Value';
