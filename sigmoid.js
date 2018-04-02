const net = (w, x) => {
    return w.reduce((sum, el, index) => sum + el * x[index], 0);
};

const f = net => 1 / (1 + Math.exp(-net)) >= 0.5 ? 1 : 0; // Сигмоидальная функция
const df = net => Math.exp(-net) / ((Math.exp(-net) + 1) ** 2); // Производная

const learning = (F, X) => {
    let w = [0, 0, 0, 0, 0]; // вектор весов
    let Y = X.map(x => f(net(w, x))); // выходной сигнал
    let E = F.reduce((sum, el, index) => sum + (el ^ Y[index]), 0); // Суммарная ошибка

    console.log(`0 Y=${Y}, W=[${w}], E=${E}`);

    let count = 1; //номер эпохи
    while (E > 0) {
        const delta = F.map((element, index) => element - Y[index]);

        w = w.map((element, i) => element + delta.reduce((sum, el, j) => sum + 0.3 * el * X[j][i] * df(net(w, X[j])), 0));
        Y = X.map(x => f(net(w, x)));
        E = F.reduce((sum, el, index) => sum + (el ^ Y[index]), 0);

        console.log(`${count} Y=${Y}, W=[${w}], E=${E}`);
        count++;
    }
};

module.exports = learning;
