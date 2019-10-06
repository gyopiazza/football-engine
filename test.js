const hyperid = require('hyperid')
const uuid = hyperid(true)

const id = uuid()

console.log(id)
console.log(uuid())
console.log(hyperid.decode(id))
console.log(hyperid.decode(uuid()))