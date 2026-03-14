import { useState } from 'react'

const s = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-fg)',
  },
  required: {
    color: 'var(--color-accent)',
    marginLeft: '2px',
  },
  input: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-fg)',
    background: 'var(--color-card)',
    border: '1px solid rgba(28,27,24,0.12)',
    borderRadius: '6px',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  inputFocus: {
    borderColor: 'var(--color-fg)',
  },
  textarea: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-fg)',
    background: 'var(--color-card)',
    border: '1px solid rgba(28,27,24,0.12)',
    borderRadius: '6px',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'border-color 0.15s',
  },
  select: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-fg)',
    background: 'var(--color-card)',
    border: '1px solid rgba(28,27,24,0.12)',
    borderRadius: '6px',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
    appearance: 'none',
    cursor: 'pointer',
  },
  hint: {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    color: 'var(--color-muted)',
    marginTop: '2px',
  },
  error: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: '#c0392b',
    background: '#fdf0ef',
    border: '1px solid rgba(192,57,43,0.2)',
    borderRadius: '6px',
    padding: '10px 14px',
  },
  button: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-card)',
    background: 'var(--color-fg)',
    border: 'none',
    borderRadius: '6px',
    padding: '13px 28px',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
    alignSelf: 'flex-start',
  },
  buttonLoading: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  success: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    color: 'var(--color-fg)',
    background: 'var(--color-accent-light)',
    border: '1px solid rgba(193,123,63,0.2)',
    borderRadius: '12px',
    padding: '32px',
    lineHeight: 1.6,
  },
  successTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '24px',
    fontWeight: 300,
    color: 'var(--color-fg)',
    marginBottom: '8px',
    display: 'block',
  },
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [focusedField, setFocusedField] = useState(null)

  function focusStyle(name) {
    return focusedField === name ? { ...s.input, ...s.inputFocus } : s.input
  }
  function focusTextareaStyle(name) {
    return focusedField === name ? { ...s.textarea, ...s.inputFocus } : s.textarea
  }
  function focusSelectStyle(name) {
    return focusedField === name ? { ...s.select, ...s.inputFocus } : s.select
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const data = Object.fromEntries(new FormData(e.target))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (json.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Could not reach the server. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div style={s.success}>
        <span style={s.successTitle}>Message received.</span>
        I'll be in touch within 12 hours. Looking forward to hearing more about your project.
      </div>
    )
  }

  const isLoading = status === 'loading'

  return (
    <form style={s.form} onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div style={s.error} role="alert">{errorMsg}</div>
      )}

      <div style={s.field}>
        <label htmlFor="name" style={s.label}>
          Name<span style={s.required}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          disabled={isLoading}
          style={focusStyle('name')}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      <div style={s.field}>
        <label htmlFor="email" style={s.label}>
          Email<span style={s.required}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          disabled={isLoading}
          style={focusStyle('email')}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      <div style={s.field}>
        <label htmlFor="description" style={s.label}>
          Tell me about your project<span style={s.required}>*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          placeholder="What do you need built? What's the goal?"
          disabled={isLoading}
          style={focusTextareaStyle('description')}
          onFocus={() => setFocusedField('description')}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      <div style={s.field}>
        <label htmlFor="budget" style={s.label}>
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          disabled={isLoading}
          style={focusSelectStyle('budget')}
          onFocus={() => setFocusedField('budget')}
          onBlur={() => setFocusedField(null)}
        >
          <option value="">Prefer not to say</option>
          <option value="under-1k">Under €1k</option>
          <option value="1k-5k">€1k – €5k</option>
          <option value="5k-15k">€5k – €15k</option>
          <option value="15k-plus">€15k+</option>
        </select>
        <span style={s.hint}>Helps me tailor the right approach for your project.</span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={isLoading ? { ...s.button, ...s.buttonLoading } : s.button}
      >
        {isLoading ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
