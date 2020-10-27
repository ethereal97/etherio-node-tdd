const debug = {
    format: "\033[1;44;37m Loadtime  \033[0;46;30m {{loadtime}}ms \033[0m \033[1;44;37m CPU  \033[0;46;30m {{user}}/{{total}}KB \033[0m <used>/<total>",
    start: {
        cpu: {
            user: null,
            system: null
        },
        time: null
    },
    end: {
        cpu: {
            user: null,
            system: null
        },
        time: null
    },
    init() {
        this.start.time = (new Date).getTime();
        this.start.cpu = process.cpuUsage();
    },

    done() {
        this.end.time = (new Date).getTime();
        this.end.cpu = process.cpuUsage();
    },

    get usage() {
        return {
            user: this.end.cpu.user - this.start.cpu.user,
            sytem: this.end.cpu.system - this.start.cpu.system,
            get total() {
                return this.user + this.sytem;
            }
        };
    },
    get loadtime() {
        return this.end.time - this.start.time;
    }
};
const os = require('os');

const test = (() => {
    let testResult;
    debug.init();
    try {
        testResult = require('./tests/app');
    } catch (err) {
        testResult = err;
    }
    debug.done();
    return testResult;
})();
if (test instanceof Error) {
    let {
        stack
    } = test;
    let dbg = [];
    let stacks = stack.split(os.EOL).slice(1).filter(
        s => s.match(/\([^(internal)].+\)/g)
    ).map(
        s => /\((.+):(\d+):(\d+)\)/.exec(s.trim()).slice(1)
    );
    console.log("\033[1;41;37m FAILED \033[0m", __filename, os.EOL);
    console.log("\033[1;33m[" + test.name + "] \033[0;4;1;37m" + test.message + "\033[0m");
    console.log(" \033[2;37mStacks\033[0m");
    for (let [file, line, col] of stacks) {
        console.log(" -", `${file}:${line}:${col}`);
        if (!dbg.length) {
            let c = require('fs').readFileSync(file).toString();
            c = c.split("\n");
            let r = [];
            for (let i = Number(line) - 2; i < Number(line) + 3; i++) {
                if (i > 0 && i < c.length) {
                    let z = c[i - 1];
                    if (i == Number(line)) {
                        let a = z.slice(0, col - 1);
                        let b = z.slice(col);
                        z = [a, "\033[4m", z[col - 1], b].join('');
                        z = "\033[2;41;37m>> " + i + " |\033[0;1;41;37m " + z + "\033[0m";
                    } else {
                        z = "   \033[2m" + i + " |\033[0m " + z;
                    }
                    dbg.push(z);
                }
            }
            dbg.push(r.join(os.EOL));
            console.log(dbg.join(os.EOL), os.EOL);
        }
    }
    console.log(os.EOL);
} else {
    console.log("\033[1;42;30m SUCCESS \033[0m", __filename, os.EOL);
    if (typeof test === "object") {
        Object.entries(test).forEach(([name, value]) => {
            let logs = [];
            logs.push("\033[33m" + name + ':');
            logs.push("\033[2;38m<" + typeof value + ">");
            logs.push("\033[0m", value);
            console.log(...logs, os.EOL);
        });
    }
}
console.log(debug.format
    .replace('{{loadtime}}', (debug.loadtime / 1000).toFixed(2))
    .replace('{{user}}', (debug.usage.user / 1000).toFixed(2))
    .replace('{{total}}', (debug.usage.total / 1000).toFixed(2)),
    os.EOL
);
