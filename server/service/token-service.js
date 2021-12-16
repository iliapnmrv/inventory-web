import jwt from "jsonwebtoken"
import pool from "../db.js"
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '60d' })
        return { accessToken, refreshToken }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    async saveToken(userId, refreshToken) {
        console.log(123);
        console.log(userId, refreshToken);
        const [tokenData] = await pool.query(
            `SELECT * FROM tokens WHERE user_id = ?`, [userId]
        )
        if (tokenData.length) {
            await pool.query(`UPDATE tokens SET refresh_token = ? WHERE user_id = ?`, [refreshToken, userId])
            return null
        }
        const [newToken] = await pool.query(
            `INSERT INTO tokens(user_id, refresh_token) 
                VALUES(?, ?)`, [userId, refreshToken])
        return newToken
    }
    async removeToken(refreshToken) {
        const [tokenData] = await pool.query(
            `DELETE FROM tokens WHERE refresh_token = ?`, [refreshToken])
        return tokenData[0]
    }
    async findToken(refreshToken) {
        const [tokenData] = await pool.query(
            `SELECT * FROM tokens WHERE refresh_token = ?`, [refreshToken])
        return tokenData[0]
    }
}

export default new TokenService