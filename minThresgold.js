const net = (w, x) => {
    return w.reduce((sum, el, index) => sum + el * x[index], 0);
};

const f = net => net > 0 ? 1 : 0; // Пороговая функия

const index = vector => vector.slice(1).reduceRight((sum, el, i, ar) => sum + Math.pow(2, ar.length - i - 1) * el, 0); // Из 2 сис в 10

const learning = (F, X, sub, flag) => { // sub - поднабор, flag - если true, то вывыодит сообщения
    let w = [0, 0, 0, 0, 0]; // вектор весов
    let Y = X.map(x => f(net(w, x))); // выходной сигнал
    let E = F.reduce((sum, el, index) => sum + (el ^ Y[index]), 0); // Суммарная ошибка

    if (flag) {
        console.log(`0 Y=${Y}, W=[${w}], E=${E}`);
    }

    let count = 1; //номер эпохи
    while (E > 0) {
        const delta = F.map((element, index) => element - Y[index]);

        w = w.map((element, i) => {
            let sum = 0;
            for (let j = 0; j < sub.length; j++) {
                sum += 0.3 * delta[index(sub[j])] * sub[j][i];
            }
            return element + sum;
        });
        Y = X.map(x => f(net(w, x)));
        E = F.reduce((sum, el, index) => sum + (el ^ Y[index]), 0);

        if (flag) {
            console.log(`${count} Y=${Y}, W=[${w}], E=${E}`);
        }
        count++;

        if (count > 100) { // Если кол-во эпох больше 100, то считаем, что на этом наборе нельзя обучить.
            return -1;
        }
    }
    return count - 1;
};

// Возвращает массив поднаборов массива array длиной len
const getCombinations = (array, len) => {
    const result = [];

    function fork(i, t) {
        if (i === array.length) {
            if (t.length === len) {
                result.push(t);
            }
            return;
        }
        fork(i + 1, t.concat([array[i]]));
        fork(i + 1, t);
    }

    fork(0, []);

    return result;
};

const findMin = (F, X) => {
    for (let i = 2; i < 16; i++) {
        const combinations = getCombinations(X, i); // Получаем все наборы по i
        let flag = 0; // 1 - Найден набор, 0 - нет
        console.log(`Перебор из ${i} вариантов...`);

        for (let j = 0; j < combinations.length; j++) {
            const subset = combinations[j];
            flag = 0;
            const count = learning(F, X, subset, 0);
            if (count > 0) {
                console.log('Найденный набор: ', subset);
                learning(F, X, subset, 1);
                flag = 1;
                break;
            }
        }

        if (flag) {
            break;
        }
    }
};

module.exports = findMin;
