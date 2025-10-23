const pool = require('../config/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// POST /api/v1/auth/signup
const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicateUser = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);

    if (duplicateUser.rows.length > 0) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    const result = await pool.query(
    'INSERT INTO "users" (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPwd]
    );

    if (result.rows.length > 0) {  
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// POST /api/v1/auth/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const userQuery = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
    const foundUser = userQuery.rows[0];

    if(!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if(!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
      {
        "User": {
          "id": foundUser.id,
          "username": foundUser.username,
          "email": foundUser.email,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20s' }
    )

    const refreshToken = jwt.sign(
      { "email": foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '60s' }
    )

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 1000
    }) 

    res.json({ id: foundUser.id, username: foundUser.username, accessToken })
})

// GET /api/v1/auth/refresh
const refresh = (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      asyncHandler(async (err, decoded) => {
        if(err) return res.status(403).json({ message: 'Forbidden' })

        const userQuery = await pool.query('SELECT * FROM "users" WHERE email = $1', [decoded.email]);
        const foundUser = userQuery.rows[0];
        
        if(!foundUser) return res.status(401).json({ message: 'Unauthorized' })

        const accessToken = jwt.sign(
          {
            "Users": {
              "id": foundUser.id,
              "username": foundUser.username,
              "email": foundUser.email,
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        )
        
        res.json({ accessToken })
      })
    )
}

// POST /api/v1/auth/logout
const logout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
  signup,
  login,
  refresh,
  logout
}