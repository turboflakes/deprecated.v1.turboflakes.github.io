import {WEIGHTS, LIMITS, COMMISSION_PLANCK} from '../constants'

export const parseInt = (x) => {
    const parsed = Number.parseInt(x, 10);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed;
}

// rate is defined between 0 and 1
export const parseRateToPercentage = (x) => {
    try {
        return Math.round(Number(x)*100)
    } catch (e) {
        console.error(e);
        return 0
    }
}

export const parseRateIntervalToPercentage = (x) => {
    try {
        return [parseRateToPercentage(x[0]), parseRateToPercentage(x[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

export const parseToRate = (x) => {
    return x/100
}

export const parseIntervalToRate = (x) => {
    try {
        return [parseToRate(x[0]), parseToRate(x[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

// commission is defined in plancks
export const parseCommissionToPercentage = (x) => {
    try {
        return Math.round((Number(x)/COMMISSION_PLANCK)*100)
    } catch (e) {
        console.error(e);
        return 0
    }
}

export const parseCommissionIntervalToPercentage = (x) => {
    try {
        return [parseCommissionToPercentage(x[0]), parseCommissionToPercentage(x[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

export const parseToCommission = (x) => {
    return (x/100) * COMMISSION_PLANCK
}

export const parseIntervalToCommission = (x) => {
    try {
        return [parseToCommission(x[0]), parseToCommission(x[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}



export const parseWeightsIntoArray = (w) => {
    try {
        const a = w.split(",")
        for (let i = 0; i < WEIGHTS.length; i++) {
            if (!!a[i]) {
                const x = parseInt(a[i])
                a[i] = x > 10 ? 10 : x
            } else {
                a.push(0)
            }
        }
        return a.slice(0, WEIGHTS.length)
    } catch (e) {
        return WEIGHTS
    }
}

export const parseIntervalsIntoArray = (l) => {
    try {
        let a = l.split(",")
        for (let i = 0; i < LIMITS.length; i++) {
            if (!!a[i]) {
                let b = a[i].split(":")
                b.forEach((elem, index, all) => all[index] = Number(elem))
                a[i] = b
            } else {
                a.push([0, 0])
            }
        }
        return a.slice(0, LIMITS.length)
    } catch (e) {
        return LIMITS
    }
}

export const parseIntervalsArrayIntoString = (l) => {
    try {
        let a = []
        for (let i = 0; i < LIMITS.length; i++) {
            if (l[i]) {
                a.push(l[i].join().replace(',', ':'))
            } else {
                a.push("0:0")
            }
        }
        return a.join()
    } catch (e) {
        return LIMITS.join()
    }
}

