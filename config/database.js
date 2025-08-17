const { neon } = require('@neondatabase/serverless');

// Inițializează conexiunea la Neon
const sql = neon(process.env.DATABASE_URL);

// Funcție pentru testarea conexiunii
async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Connected to Neon database successfully!');
    console.log('📅 Current time from DB:', result[0].current_time);
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    return false;
  }
}

module.exports = { sql, testConnection };