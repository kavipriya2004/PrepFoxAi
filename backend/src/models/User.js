import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (userData) => {
    const { name, email, contact, education, skills, interestedCompanies } = userData;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insert user
        const userResult = await client.query(
            `INSERT INTO users (id, name, email, contact, created_at, updated_at)
             VALUES ($1, $2, $3, $4, NOW(), NOW())
             RETURNING *`,
            [uuidv4(), name, email, contact]
        );

        const user = userResult.rows[0];

        // Insert user profile
        const profileResult = await client.query(
            `INSERT INTO user_profiles (id, user_id, education, skills, interested_companies, onboarding_completed, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
             RETURNING *`,
            [uuidv4(), user.id, JSON.stringify(education), skills, interestedCompanies, true]
        );

        await client.query('COMMIT');

        return {
            user,
            profile: profileResult.rows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export const checkEmailExists = async (email) => {
    const result = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );

    return result.rows.length > 0;
};

export const getUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT u.*, up.education, up.skills, up.interested_companies, up.onboarding_completed
         FROM users u
         LEFT JOIN user_profiles up ON u.id = up.user_id
         WHERE u.email = $1`,
        [email]
    );

    return result.rows[0] || null;
};
