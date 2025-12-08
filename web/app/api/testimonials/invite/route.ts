import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { emails } = body

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'emails array is required' },
        { status: 400 }
      )
    }

    // Llamar al backend NestJS
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cms-dev-1ft6.onrender.com'
    const response = await fetch(`${backendUrl}/testimonials/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Agregar token si es necesario
        ...(req.headers.get('authorization') && {
          authorization: req.headers.get('authorization')!,
        }),
      },
      body: JSON.stringify({ emails }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error en /api/testimonials/invite:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
