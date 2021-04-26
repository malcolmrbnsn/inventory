
/**
 * Validates a form when passed an array of fields
 * @param {[string]} fields 
 * @returns {boolean} Form validity
 */
function validateFields(fields) {
    let vals = []
    fields.forEach(i => {
        if (typeof i === "string" && i.length > 0) {
            vals.push(true)
        } else {
            vals.push(false)
        }
    })
    return !vals.includes(false)
}




module.exports = validateFields