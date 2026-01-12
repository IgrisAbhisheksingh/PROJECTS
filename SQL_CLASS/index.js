const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Maner@123'
});

// ✅ Correct error handling
connection.query("SHOW TABLES", (error, result) => {
  if (error) {
    console.error("Database Error:", error);
    return;
  }
  console.log("Tables:", result);
});
connection.end();

// Faker user
const getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
      

 
