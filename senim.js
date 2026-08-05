/* ============================================================
   Актуарный калькулятор НСЖ «Saqtau Senim» — порт SenimCalculator.java
   (сам он 1:1 повторяет эталонный engine.js). Режим «премия → страховая сумма».
   Округления повторяют исходник, поэтому числа сходятся с приложением.
   ============================================================ */
import { MORTALITY_MALE, MORTALITY_FEMALE, CI_MALE, CI_FEMALE } from './senim-tables.js';

export const RATE_REGULAR = 0.07;
export const RATE_SINGLE = 0.12;
const OMEGA = 100;
const SURRENDER_PENALTY = 0.01;

/** Периодичность оплаты: коэффициент, минимальный взнос, подписи */
export const FREQ = {
    ANNUAL: { factor: 1.0, minPremium: 120000, periodLabel: 'ежегодно', errorLabel: 'раз в год' },
    SEMIANNUAL: { factor: 0.51, minPremium: 100000, periodLabel: 'раз в полгода', errorLabel: 'раз в полгода' },
    QUARTERLY: { factor: 0.2575, minPremium: 50000, periodLabel: 'ежеквартально', errorLabel: 'ежеквартально' },
    MONTHLY: { factor: 0.0875, minPremium: 10000, periodLabel: 'ежемесячно', errorLabel: 'ежемесячно' },
    SINGLE: { factor: 1.0, minPremium: 0, periodLabel: 'единовременно', errorLabel: 'единовременно' },
};

/** Дополнительные покрытия: нетто-тариф, нагрузка, аквизиция */
export const RIDER = {
    ACCIDENTAL_DEATH: { title: 'Смерть в результате несчастного случая', net: 0.001008, load: 0.25, acq: 0.4 },
    TRAFFIC_DEATH: { title: 'Смерть в результате ДТП', net: 0.000336, load: 0.25, acq: 0.4 },
    DISABILITY_ACCIDENT_LUMPSUM: { title: 'Инвалидность 1, 2 группы (несчастный случай)', net: 0.00048, load: 0.25, acq: 0.4 },
    DISABILITY_ANY_LUMPSUM: { title: 'Инвалидность 1, 2 группы (любая причина)', net: 0.001392, load: 0.25, acq: 0.4 },
    TRAUMA: { title: 'Телесные травмы от несчастного случая', net: 0.0045, load: 0.05, acq: 0.25 },
    TRAUMA_EXTRA: { title: 'Травмы от несчастного случая (доп. застрахованный)', net: 0.005643, load: 0.05, acq: 0.25 },
    TEMPORARY_DISABILITY: { title: 'Временная утрата трудоспособности (несчастный случай)', net: 0.002, load: 0.05, acq: 0.25 },
    HOSPITALIZATION: { title: 'Госпитализация в результате несчастного случая', net: 0.000786, load: 0.05, acq: 0.25 },
    CRITICAL_ILLNESS: { title: 'Критические заболевания', net: 0, load: 0, acq: 0 },
    PREMIUM_WAIVER: { title: 'Освобождение от уплаты взносов при инвалидности', net: 0, load: 0, acq: 0 },
};
Object.entries(RIDER).forEach(([key, r]) => { r.key = key; });

/** Расходные коэффициенты по сроку: K/L — аквизиция 1-го/2-го года, M — единовременная, N — от премий, O — от СС */
const EXPENSES = {
    3: [0.11923, 0.02, 0.021, 0.02, 0.0], 4: [0.1523, 0.02, 0.025, 0.02, 0.0],
    5: [0.18538, 0.04, 0.027, 0.025, 0.0], 6: [0.2946, 0.1434, 0.029, 0.03, 0.003],
    7: [0.3387, 0.1623, 0.030, 0.03, 0.003], 8: [0.3828, 0.1812, 0.03, 0.03, 0.003],
    9: [0.4269, 0.2001, 0.03, 0.03, 0.003], 10: [0.501, 0.249, 0.03, 0.04, 0.003],
    11: [0.5451, 0.2679, 0.03, 0.04, 0.003], 12: [0.5892, 0.2868, 0.03, 0.04, 0.003],
    13: [0.6333, 0.3057, 0.03, 0.04, 0.003], 14: [0.6774, 0.3246, 0.03, 0.04, 0.003],
    15: [0.7215, 0.3435, 0.025, 0.04, 0.003],
};

const round4 = v => Math.round(v * 10000) / 10000;
const ceil2 = v => Math.ceil(v * 100) / 100;
const grossTariff = r => round4(r.net * (1 + r.load) / (1 - r.acq));

function buildCommTable(ratesPer1000, i) {
    const v = 1 / (1 + i);
    const q = ratesPer1000.map(r => r / 1000);
    q[OMEGA] = 1;
    const l = new Array(OMEGA + 1).fill(0);
    l[0] = 1000000;
    for (let x = 0; x < OMEGA; x++) l[x + 1] = l[x] * (1 - q[x]);
    const D = l.map((lx, x) => lx * Math.pow(v, x));
    const N = new Array(OMEGA + 1).fill(0);
    N[OMEGA] = D[OMEGA];
    for (let x = OMEGA - 1; x >= 0; x--) N[x] = D[x] + N[x + 1];
    const C = new Array(OMEGA + 1).fill(0);
    for (let x = 0; x < OMEGA; x++) C[x] = (l[x] - l[x + 1]) * Math.pow(v, x + 1);
    C[OMEGA] = l[OMEGA] >= 1 ? 1 : 0;
    const M = new Array(OMEGA + 1).fill(0);
    M[OMEGA] = C[OMEGA];
    for (let x = OMEGA - 1; x >= 0; x--) M[x] = C[x] + M[x + 1];
    return { D, N, C, M };
}

function buildCiTable(mortalityPer1000, ciPer1000, i) {
    const v = 1 / (1 + i);
    const qd = mortalityPer1000.map(r => r / 1000);
    const qc = ciPer1000.map(r => r / 1000);
    qd[OMEGA] = 1;
    for (let x = 0; x <= OMEGA; x++) {
        const s = qd[x] + qc[x];
        if (s > 1) { qd[x] = qd[x] / s; qc[x] = qc[x] / s; }
    }
    const l = new Array(OMEGA + 1).fill(0);
    l[0] = 1000000;
    for (let x = 0; x < OMEGA; x++) l[x + 1] = Math.max(l[x] * (1 - qd[x] - qc[x]), 0);
    const D = l.map((lx, x) => lx * Math.pow(v, x));
    const N = new Array(OMEGA + 1).fill(0);
    N[OMEGA] = D[OMEGA];
    for (let x = OMEGA - 1; x >= 0; x--) N[x] = D[x] + N[x + 1];
    return { D, N, qc };
}

const expenseKey = n => Math.min(Math.max(n, 3), 15);
function expenseParams(n, t) {
    const byTerm = EXPENSES[expenseKey(n)];
    const g6 = byTerm[3], g7 = byTerm[4], g10 = ceil2(byTerm[2]);
    let g2, g3;
    if (t === 1) { g2 = g10; g3 = g10; }
    else { const byPay = EXPENSES[expenseKey(t)]; g2 = ceil2(byPay[0]); g3 = ceil2(byPay[1]); }
    return { g2, g3, g6, g7 };
}

function mainRates(tb, x, n, t) {
    const dx = tb.D[x], dxn = tb.D[x + n], dx1 = tb.D[x + 1];
    const mx = tb.M[x], mxn = tb.M[x + n];
    const nx = tb.N[x], nxn = tb.N[x + n], nxt = tb.N[x + t];
    const ax = (mx - mxn + dxn) / dx;
    const an = (nx - nxn) / dx;
    const at = (nx - nxt) / dx;
    const np = at > 0 ? ax / at : 0;
    const ge = expenseParams(n, t);
    const num = ax + ge.g7 * an;
    const den = at - ge.g6 * at - (ge.g2 + ge.g3 * dx1 / dx);
    const bp = den > 0 ? num / den : 0;
    return { ax, an, at, bp, np, ge };
}

function simpleRiderPremium(rider, sum, n, ff, single) {
    const gt = grossTariff(rider);
    return single ? Math.round(gt * sum * n) : Math.round(gt * sum * ff);
}

function ciPremium(qx, qci, i, x, n, t, ge, ff, ciSum, single) {
    const ctb = buildCiTable(qx, qci, i);
    const dx0 = ctb.D[x];
    if (dx0 === 0) return 0;
    let aCi = 0;
    for (let k = 0; k < n; k++) {
        const ageK = x + k;
        if (ageK > OMEGA) break;
        aCi += ctb.D[ageK] / dx0 * ctb.qc[ageK];
    }
    const axN = (ctb.N[x] - ctb.N[x + n]) / dx0;
    const axT = (ctb.N[x] - ctb.N[x + t]) / dx0;
    const dx1 = ctb.D[x + 1];
    const num = aCi + ge.g7 * axN;
    const den = axT - ge.g6 * axT - (ge.g2 + ge.g3 * dx1 / dx0);
    const bpCi = round4(den > 0 ? num / den : 0);
    return single ? Math.round(bpCi * ciSum) : Math.round(bpCi * ciSum * ff);
}

function premiumWaiverPremium(annualPremiumMain, ff, single, n) {
    if (single || n <= 1) return 0;
    const ap = Math.round(annualPremiumMain);
    const j6 = grossTariff(RIDER.DISABILITY_ACCIDENT_LUMPSUM);
    let rSum = 0;
    for (let k = 0; k < n - 1; k++) rSum += Math.round((n - 1 - k) * ap * j6);
    return Math.round(rSum / (n - 1) * ff);
}

function riderPremium(rider, sum, x, n, t, ff, single, annualPm, qx, qci, ge, i) {
    if (rider === RIDER.PREMIUM_WAIVER) return premiumWaiverPremium(annualPm, ff, single, n);
    if (rider === RIDER.CRITICAL_ILLNESS) return ciPremium(qx, qci, i, x, n, t, ge, ff, sum, single);
    return simpleRiderPremium(rider, sum, n, ff, single);
}

const fail = (error, x, exitAge) => ({ success: false, error, age: x, exitAge });

/**
 * @param p {dob:Date, today:Date, male:boolean, term:number, frequency, premium:number,
 *           group1:Rider|null, group2:Rider|null, group3:Array<[Rider, number]>}
 */
export function calculate(p) {
    if (!p.dob || isNaN(p.dob.getTime())) return fail('Некорректная дата рождения.', 0, 0);
    const today = p.today || new Date();
    let x = today.getFullYear() - p.dob.getFullYear();
    const m = today.getMonth() - p.dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < p.dob.getDate())) x--;
    const n = p.term;
    const fr = p.frequency;
    const single = fr === FREQ.SINGLE;
    const i = single ? RATE_SINGLE : RATE_REGULAR;
    const qx = p.male ? MORTALITY_MALE : MORTALITY_FEMALE;
    const qci = p.male ? CI_MALE : CI_FEMALE;
    const ff = single ? 1 : fr.factor;
    const exitAge = x + n;

    if (n < 3 || n > 20) return fail('Срок страхования должен быть от 3 до 20 лет.', x, exitAge);
    if (x < 18) return fail('Минимальный возраст застрахованного — 18 лет.', x, exitAge);
    if (exitAge > 70) {
        return fail('Возраст застрахованного на момент окончания договора составит ' + exitAge
            + ' лет. Максимально допустимый возраст на выходе — 70 лет. Уменьшите срок страхования'
            + ' или проверьте дату рождения.', x, exitAge);
    }

    const tb = buildCommTable(qx, i);
    const t = single ? 1 : n;
    const r = mainRates(tb, x, n, t);
    const bp = r.bp, ge = r.ge;

    const saLinked = [];
    if (p.group1) saLinked.push(p.group1);
    if (p.group2) saLinked.push(p.group2);
    const fixed = p.group3 || [];

    const totalInput = p.premium;
    if (fr.minPremium > 0 && totalInput < fr.minPremium) {
        return fail('Минимальный взнос для оплаты «' + fr.errorLabel + '» — ' + formatInt(fr.minPremium) + ' тг.', x, exitAge);
    }

    let fixedTotal = 0;
    fixed.forEach(([rider, sum]) => { fixedTotal += riderPremium(rider, sum, x, n, t, ff, single, 0, qx, qci, ge, i); });

    const tpRound = saTry => {
        const mp = single ? Math.round(bp * saTry) : Math.round(bp * saTry * ff);
        const apm = bp * saTry;
        let salTotal = 0;
        saLinked.forEach(rk => { salTotal += riderPremium(rk, saTry, x, n, t, ff, single, apm, qx, qci, ge, i); });
        return mp + salTotal + fixedTotal;
    };
    const tpSmooth = saTry => {
        const mp = single ? bp * saTry : bp * saTry * ff;
        const apm = bp * saTry;
        let salTotal = 0;
        saLinked.forEach(rk => {
            if (rk === RIDER.PREMIUM_WAIVER) {
                if (single || n <= 1) return;
                const j6 = grossTariff(RIDER.DISABILITY_ACCIDENT_LUMPSUM);
                let pwSum = 0;
                for (let k = 0; k < n - 1; k++) pwSum += (n - 1 - k) * apm * j6;
                salTotal += pwSum / (n - 1) * ff;
            } else if (rk === RIDER.CRITICAL_ILLNESS) {
                salTotal += ciPremium(qx, qci, i, x, n, t, ge, ff, saTry, single);
            } else {
                salTotal += simpleRiderPremium(rk, saTry, n, ff, single);
            }
        });
        return mp + salTotal + fixedTotal;
    };

    // Фаза 1 — бинарный поиск
    let saUpper = bp > 0 ? (single ? totalInput / bp * 2 : totalInput / (bp * ff) * 2) : 0;
    let saLower = 0;
    if (saUpper > 0) {
        while (tpSmooth(saUpper) < totalInput) { saUpper *= 2; if (saUpper > 1e15) break; }
    }
    for (let it = 0; it < 300; it++) {
        const saMid = (saLower + saUpper) / 2;
        if (tpSmooth(saMid) < totalInput) saLower = saMid; else saUpper = saMid;
        if (saUpper - saLower < 1e-6) break;
    }
    const saSmooth = (saLower + saUpper) / 2;

    // Фаза 2 — аналитическое решение
    const hasPw = !single && saLinked.includes(RIDER.PREMIUM_WAIVER);
    let saTariffSum = 0;
    saLinked.forEach(rk => { if (rk !== RIDER.PREMIUM_WAIVER && rk !== RIDER.CRITICAL_ILLNESS) saTariffSum += grossTariff(rk); });
    const totalRate = hasPw
        ? (bp * (1 + grossTariff(RIDER.DISABILITY_ACCIDENT_LUMPSUM) * n / 2) + saTariffSum) * ff
        : (bp + saTariffSum) * (single ? 1 : ff);
    const saCont = totalRate > 0 ? (totalInput - fixedTotal) / totalRate : saSmooth;

    // Фаза 3 — уточнение по кандидатам
    let bestSa = saSmooth;
    let bestDiff = Math.abs(tpRound(saSmooth) - totalInput);
    const offsets = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    const deltas = [-0.5, -0.25, -0.1, -0.01, 0, 0.01, 0.1, 0.25, 0.5];
    const cands = [];
    offsets.forEach(off => cands.push(Math.round(saSmooth) + off));
    deltas.forEach(d => cands.push(saSmooth + d));
    cands.push(saCont);
    offsets.forEach(off => cands.push(Math.round(saCont) + off));
    deltas.forEach(d => cands.push(saCont + d));
    cands.forEach(c => {
        if (c <= 0) return;
        const diff = Math.abs(tpRound(c) - totalInput);
        if (diff < bestDiff) { bestDiff = diff; bestSa = c; }
    });

    const sa = Math.round(bestSa * 100) / 100;
    const ap = bp * sa;
    const gp = single ? Math.round(bp * sa) : Math.round(bp * sa * ff);

    const riders = [];
    let ridersTotal = 0;
    saLinked.forEach(rk => {
        if (rk === RIDER.PREMIUM_WAIVER) {
            const wp = premiumWaiverPremium(ap, ff, single, n);
            riders.push({ rider: rk, sum: null, premium: wp });
            ridersTotal += wp;
        } else {
            const rp = simpleRiderPremium(rk, sa, n, ff, single);
            riders.push({ rider: rk, sum: sa, premium: rp });
            ridersTotal += rp;
        }
    });
    fixed.forEach(([rk, sum]) => {
        const rp = rk === RIDER.CRITICAL_ILLNESS
            ? ciPremium(qx, qci, i, x, n, t, ge, ff, sum, single)
            : simpleRiderPremium(rk, sum, n, ff, single);
        riders.push({ rider: rk, sum, premium: rp });
        ridersTotal += rp;
    });

    const totalPremium = Math.round(gp + ridersTotal);
    if (fr.minPremium > 0 && totalPremium < fr.minPremium) {
        return fail('Минимальный взнос для оплаты «' + fr.errorLabel + '» — ' + formatInt(fr.minPremium)
            + ' тг. Текущий расчёт: ' + formatInt(totalPremium) + ' тг.', x, exitAge);
    }

    return {
        success: true, age: x, exitAge, term: n, frequency: fr,
        sumAssured: sa, annualPremium: Math.round(ap), grossPremium: gp,
        riders, ridersTotal, totalPremium,
    };
}

/** 1234567 → «1 234 567» (неразрывные пробелы) */
export function formatInt(v) {
    const s = String(v);
    let out = '';
    for (let idx = 0; idx < s.length; idx++) {
        if (idx > 0 && (s.length - idx) % 3 === 0 && s[idx - 1] !== '-') out += ' ';
        out += s[idx];
    }
    return out;
}
