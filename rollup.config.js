import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-re";
import filesize from "rollup-plugin-filesize";
import cleanup from "rollup-plugin-cleanup";

const license = require("rollup-plugin-license");
const json = require("./package.json");
//const importAlias = require('rollup-plugin-import-alias');


export default {
    input: './src/index.js',
    // output: {
    //     file: 'bundle.js',
    //     format: 'umd'    
    // },
    dest: './dist/vue.js',
    format: "umd",
    exports: "default",
    plugins: [
        babel(),
        cleanup()
    ],
    moduleName: "Vue"
};


/**
 * rollup
 * 项目目录下rollup.config.js
 * rollup命令
 */








