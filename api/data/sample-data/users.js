const bcrypt = require('bcryptjs');

const rounds = process.env.DB_ROUNDS 
? Number(process.env.DB_ROUNDS) 
: 8;

const userPassword = process.env.TEST_USER_PASSWORD || '1234';
const adminPassword = process.env.TEST_ADMIN_PASSWORD || '1234';

const userHash = bcrypt.hashSync(userPassword, rounds);
const adminHash = bcrypt.hashSync(adminPassword, rounds);

const users = [
  { // 1
    username: 'Mario',
    password: userHash,
    email: 'mario@gmail.com',
    email_confirmed: 1,
    role_id: 1
  },
  { // 2
    username: 'Luigi',
    password: userHash,
    email: 'luigi@gmail.com',
    email_confirmed: 1,
    role_id: 1
  },
  { // 3
    username: 'Princess Peach',
    password: userHash,
    email: 'princess.peach@gmail.com',
    email_confirmed: 1,
    role_id: 1
  },
  { // 4
    username: 'Bowser',
    password: userHash,
    email: 'bowser@gmail.com',
    email_confirmed: 0,
    role_id: 1
  },
  { // 5
    username: 'Toad',
    password: adminHash,
    email: 'toad@gmail.com',
    email_confirmed: 1,
    role_id: 2
  },
  { // 6
    username: 'Princess Daisy',
    password: adminHash,
    email: 'princess.daisy@gmail.com',
    email_confirmed: 1,
    role_id: 2
  },
  { // 7
    username: 'Yoshi',
    password: adminHash,
    email: 'yoshi@gmail.com',
    email_confirmed: 1,
    role_id: 2
  },
  { //  8
    username: 'Wario',
    password: adminHash,
    email: 'wario@gmail.com',
    email_confirmed: 1,
    role_id: 2
  }
]

module.exports = users;