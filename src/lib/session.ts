import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

// Gunakan SESSION_SECRET yang terpisah dan tidak NEXT_PUBLIC_
// Fallback ke SUPABASE_SERVICE_ROLE_KEY agar tidak expose anon key ke JWT
const rawSecret =
  process.env.SESSION_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'fallback_secret_ganti_di_production_min_32_chars!!'

const key = new TextEncoder().encode(rawSecret)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function createSession(pesertaId: string) {
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
  const session = await encrypt({ pesertaId, expires })

  const cookieStore = await cookies()
  cookieStore.set('peserta_session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('peserta_session')?.value
  if (!session) return null
  try {
    return await decrypt(session)
  } catch (error) {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.set('peserta_session', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}
