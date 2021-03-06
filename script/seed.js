'use strict'

const db = require('../server/db')
const {User, Stock, Transaction, Holding} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Coderson',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Coderson',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const stocks = await Promise.all([
    Stock.create({
      name: 'Alphabet, Inc.',
      symbol: 'GOOGL'
    }),
    Stock.create({
      name: 'General Electric Co.',
      symbol: 'GE'
    })
  ])

  const holdings = await Promise.all([
    Holding.create({
      userId: 1,
      stockId: 1,
      shares: 10
    }),
    Holding.create({
      userId: 1,
      stockId: 2,
      shares: 5
    }),
    Holding.create({
      userId: 2,
      stockId: 2,
      shares: 500
    })
  ])

  const transactions = await Promise.all([
    Transaction.create({
      userId: 1,
      stockId: 1,
      type: 'buy',
      shares: 10,
      price: 19.91
    }),
    Transaction.create({
      userId: 1,
      stockId: 2,
      type: 'buy',
      shares: 5,
      price: 8.32
    }),
    Transaction.create({
      userId: 2,
      stockId: 1,
      type: 'sell',
      shares: 50,
      price: 32.55
    }),
    Transaction.create({
      userId: 2,
      stockId: 2,
      type: 'buy',
      shares: 500,
      price: 8.32
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${stocks.length} stocks`)
  console.log(`seeded ${holdings.length} holdings`)
  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
