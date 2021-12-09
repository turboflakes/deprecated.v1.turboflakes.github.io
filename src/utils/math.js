import {WEIGHTS, LIMITS, COMMISSION_PLANCK} from '../constants'

export const parseInt = (x) => {
    const parsed = Number.parseInt(x, 10);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed;
}

// rate is defined between 0 and 1
export const parseRateToPercentage = (value) => {
    try {
        return Math.round(Number(value)*100)
    } catch (e) {
        console.error(e);
        return 0
    }
}

export const parseRateIntervalToPercentage = (interval = [0,0]) => {
    try {
        return [parseRateToPercentage(interval[0]), parseRateToPercentage(interval[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

export const parseToRate = (value) => {
    return value/100
}

export const parseIntervalToRate = (interval = [0,0]) => {
    try {
        return [parseToRate(interval[0]), parseToRate(interval[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

// commission is defined in plancks
export const parseCommissionToPercentage = (value) => {
    try {
        return Math.round((Number(value)/COMMISSION_PLANCK)*100)
    } catch (e) {
        console.error(e);
        return 0
    }
}

export const parseCommissionIntervalToPercentage = (interval = [0,0]) => {
    try {
        return [parseCommissionToPercentage(interval[0]), parseCommissionToPercentage(interval[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

export const parseToCommission = (value) => {
    return (value/100) * COMMISSION_PLANCK
}

export const parseIntervalToCommission = (interval = [0,0]) => {
    try {
        return [parseToCommission(interval[0]), parseToCommission(interval[1])]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

export const parsePoints = (value) => {
    try {
        return Math.ceil(Number(value))
    } catch (e) {
        console.error(e);
        return 0
    }
}

export const parsePointsInterval = (interval = [0,0]) => {
    try {
        return [Math.floor(Number(interval[0])), Math.ceil(Number(interval[1]))]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

export const parseTokenInPlanckToUnit = (value, networkDetails) => {
    try {
        if (!!networkDetails.token_decimals) {
            const networkDecimals = Math.pow(10, Number(networkDetails.token_decimals))
            return Math.round(Number(value)/networkDecimals)
        }
        return Number(value)
    }
    catch (e) {
        console.error(e);
        return 0
    }
}

export const parseTokenInPlanckIntervalToUnit = (interval = [0,0], networkDetails) => {
    try {
        return [parseTokenInPlanckToUnit(interval[0], networkDetails), parseTokenInPlanckToUnit(interval[1], networkDetails)]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}

export const parseTokenInUnitToPlanck = (value, networkDetails) => {
    try {
        if (!!networkDetails.token_decimals) {
            const networkDecimals = Math.pow(10, Number(networkDetails.token_decimals))
            return Number(value)*networkDecimals
        }
        return Number(value)
    }
    catch (e) {
        console.error(e);
        return 0
    }
}

export const parseTokenIntervalInUnitToPlanck = (interval = [0,0], networkDetails) => {
    try {
        return [parseTokenInUnitToPlanck(interval[0], networkDetails), parseTokenInUnitToPlanck(interval[1], networkDetails)]
    }
    catch (e) {
        console.error(e);
        return [0, 0]
    }
}
// 

export const parseWeightsIntoArray = (w) => {
    try {
        const a = w.split(",")
        for (let i = 0; i < WEIGHTS.length; i++) {
            if (!!a[i]) {
                const x = parseInt(a[i])
                a[i] = x >= 10 ? 9 : x
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

