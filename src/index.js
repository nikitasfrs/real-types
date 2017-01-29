/**
 * Converts strings to corresponding types. Performs deep conversion.
 *
 * @param {any} data - Data to be normalized.
 * @param {boolean} nullOnly - Convert undefined values to null (optional).
 *
 * @author Nikitas Frantzeskakis
 */
export default function normalize(data, nullOnly) {
    function isArray(item) {
        return Array.isArray(item)
    }
    function isObject(item) {
        return (item != null && typeof item == 'object');
    }
    function checkBool(item) {
        return (String(item) === 'true' || String(item) === 'false');
    }
    function checkNumber(item) {
        if (item === "") {
            return false;
        }
        return (!Number.isNaN(Number(item)));
    }
    function convert(cur) {
        if (cur === undefined || cur === null) {
            return (nullOnly) ? null : cur;
        }
        let item = cur;
        if (cur.trim) {
            item = cur.trim();
        }
        if (checkBool(item)) {
            return (item === true || item === 'true');
        } else if (isArray(item) || isObject(item)) {
            return normalize(item);
        } else if (checkNumber(item)) {
            return Number(item);
        } else {
            return cur;
        }
    }
    // check array first since it is obj
    if (isArray(data)) {
        return data.map((item) => {
            return convert(item);
        });
    } else if (isObject(data)) {
        return Object.keys(data).reduce((prev, cur) => {
            prev[cur] = convert(data[cur]);
            return prev;
        }, {});
    } else {
        return convert(data);
    }
}
