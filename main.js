const threshold = require('./threshold');
const sigmoid = require('./sigmoid');
const minThresgold = require('./minThresgold');
const minSigmoid = require('./minSigmoid');

const F = [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1];
const X = [[1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
    [1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1]
];

class Logger {
    constructor() {
        this.repeat = '-'.repeat(25);
    }

    log(title, callback, ...args) {
        console.log(`\n${this.repeat} ${title} - старт ${this.repeat}\n`);
        callback(...args);
        console.log(`\n${this.repeat} ${title} - законченно ${this.repeat}\n`);

        return this;
    }
}

new Logger()
    .log('Пороговая', threshold, F, X)
    .log('Сигмоидальная', sigmoid, F, X)
    .log('Минимальный набор(Пороговая)', minThresgold, F, X)
    .log('Минимальный набор(Сигмоидальная)', minSigmoid, F, X);
