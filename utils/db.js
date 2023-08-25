const { db } = require('@vercel/postgres')

exports.query = async (sql, values = []) => {
    const client = await db.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};