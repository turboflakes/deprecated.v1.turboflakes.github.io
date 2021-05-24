import {WEIGHTS} from '../constants'

export const parseInt = (x) => {
    const parsed = Number.parseInt(x, 10);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed;
}

export const parseArray = (w) => {
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