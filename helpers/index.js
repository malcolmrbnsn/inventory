
function exists() {
    let fields = [...arguments];
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

module.exports = {exists}