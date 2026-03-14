import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })

  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400)
  }

  const { name, email, description, budget } = body

  if (!name?.trim() || !email?.trim() || !description?.trim()) {
    return json({ ok: false, error: 'Name, email, and project description are required.' }, 400)
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400)
  }

  // TODO: send via Resend
  // import { Resend } from 'resend'
  // const resend = new Resend(import.meta.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'portfolio@yourdomain.com',
  //   to: 'hello@yourdomain.com',
  //   subject: `New enquiry from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget || 'Not specified'}\n\n${description}`,
  // })

  console.log('[contact] New enquiry:', { name, email, budget: budget || 'not specified' })

  return json({ ok: true })
}
