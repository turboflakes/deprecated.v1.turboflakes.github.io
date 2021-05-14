/**
 * Convert Object to Query String
 * @param obj
 * @returns {string}
 */
const serialize = (obj) => {
    let str = [];
    for(let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export default serialize
