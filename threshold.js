const net = (w, x) => {
    return w.reduce((sum, el, index) => sum + el * x[index], 0);
};

const f = net => net > 0 ? 1 : 0; // Пороговая функция


const learning = (F, X) => {
    let w = [0, 0, 0, 0, 0]; // вектор весов
    let Y = X.map(x => f(net(w, x))); // выходной сигнал
    let E = F.reduce((sum, el, index) => sum + (el ^ Y[index]), 0); // Суммарная ошибка

    console.log(`0 Y=${Y}, W=[${w}], E=${E}`);

    let count = 1; //номер эпохи
    while (E > 0) {
        const delta = F.map((element, index) => element - Y[index]);

        w = w.map((element, i) => element + delta.reduce((sum, el, j) => sum + 0.3 * el * X[j][i], 0));
        Y = X.map(x => f(net(w, x)));
        E = F.reduce((sum, el, index) => sum + (el ^ Y[index]), 0);

        console.log(`${count} Y=${Y}, W=[${w}], E=${E}`);
        count++;
    }
};

module.exports = learning;
