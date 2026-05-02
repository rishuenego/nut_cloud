import type { PassportStatic } from 'passport'
import passportGoogle from 'passport-google-oauth20'
const GoogleStrategy = passportGoogle.Strategy
import { getOne, execute } from './db.js'

interface User {
  id: number
  google_id: string
  email: string
  name: string
  password?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  created_at: Date
  updated_at: Date
}

export function configurePassport(passport: PassportStatic) {
  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL ||
            (process.env.NODE_ENV === 'production' || process.env.RENDER
              ? 'https://nutbaba.in/api/auth/google/callback'
              : `http://localhost:${process.env.PORT || 5000}/api/auth/google/callback`),
          passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
          try {
            const rawEmail = profile.emails?.[0]?.value
            const googleEmail = rawEmail ? rawEmail.toLowerCase() : null
            const googleId = profile.id

            // 1. Try to find user by google_id first
            let user = await getOne<User>(
              'SELECT * FROM users WHERE google_id = ?',
              [googleId]
            )

            if (!user && googleEmail) {
              // 2. Check if a user already exists with this email (registered via email/password)
              const existingUser = await getOne<User>(
                'SELECT * FROM users WHERE LOWER(email) = ?',
                [googleEmail]
              )

              if (existingUser) {
                // Check if this user has a password (registered via email/password)
                if (existingUser.password && !existingUser.google_id) {
                  // User registered with email/password - link Google account to existing account
                  await execute(
                    'UPDATE users SET google_id = ?, updated_at = NOW() WHERE id = ?',
                    [googleId, existingUser.id]
                  )
                  // Re-fetch to get updated record
                  user = await getOne<User>('SELECT * FROM users WHERE id = ?', [existingUser.id])
                } else if (existingUser.google_id && existingUser.google_id !== googleId) {
                  // This email is linked to a different Google account - this shouldn't happen normally
                  console.warn(`User ${existingUser.id} has a different google_id linked. Email: ${googleEmail}`)
                  // Allow login with the existing account
                  user = existingUser
                } else {
                  // User already has this Google ID or no password (pure Google user)
                  user = existingUser
                }
              }
            }

            if (!user) {
              // 3. No existing account at all — create a new one
              try {
                const result = await execute(
                  `INSERT INTO users (google_id, email, name, created_at, updated_at)
                   VALUES (?, ?, ?, NOW(), NOW())`,
                  [googleId, googleEmail, profile.displayName]
                )

                user = await getOne<User>('SELECT * FROM users WHERE id = ?', [
                  result.insertId,
                ])
              } catch (insertError: any) {
                // Handle rare race condition where user was created between our check and insert
                if (insertError.code === 'ER_DUP_ENTRY') {
                  user = await getOne<User>(
                    'SELECT * FROM users WHERE google_id = ? OR LOWER(email) = ?',
                    [googleId, googleEmail]
                  )
                } else {
                  throw insertError
                }
              }
            }

            return done(null, user || false)
          } catch (error) {
            console.error('Passport Google Strategy Error:', error)
            return done(error as Error)
          }
        }
      )
    )
  }

  // Serialize user
  passport.serializeUser((user: Express.User, done) => {
    done(null, (user as User).id)
  })

  // Deserialize user
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await getOne<User>('SELECT * FROM users WHERE id = ?', [id])
      done(null, user || false)
    } catch (error) {
      done(error)
    }
  })
}
