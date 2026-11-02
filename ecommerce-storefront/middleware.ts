import { NextRequest, NextResponse } from 'next/server'
export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') || '').split(':')[0]
  const res = NextResponse.next()
  res.headers.set('x-tenant-host', host)
  return res
}