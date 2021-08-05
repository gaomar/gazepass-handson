require('dotenv').config({ path: `../.env` })
const app = require('./app')

app.listen(9000, () => {
  console.log('listening')
})