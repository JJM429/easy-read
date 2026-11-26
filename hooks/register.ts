import type { Register, ThemeSetArgs, ThemeStyle } from 'claude-code'

import { makeColors } from './make-colors.js'

// How replies are written.
const WRITING = {
  id: 'easy-read:writing',
  scope: 'session',
  text: [
    '# Writing for readability',
    'The user finds replies easier to read when they follow these rules. Apply them to every reply:',
    '- Put the answer or key point in the first sentence.',
    '- Keep paragraphs short: two or three sentences at most.',
    '- Use plain, everyday words. Explain any technical term the first time it appears, in a few words.',
    '- Prefer short sentences. One idea per sentence.',
    '- Use bullet points or numbered steps for lists, options and instructions.',
    '- Use a short heading for each part of a longer reply. Skip headings for short replies.',
    '- Bold only the one or two phrases that matter most. Never bold whole sentences.',
    '- Leave out filler, hedging and repetition. Do not restate the question.',
    '- End a longer reply with a one-line summary or the next step.',
  ].join('\n'),
} as const

// Calm, high-contrast colors: cool paper by day, deep slate by night.
const { theme, problems } = makeColors({
  label: 'Easy read',
  roles: { accent: '#1f5fa8', danger: '#b4232c', success: '#2e7d32', warning: '#9a6a00', pro: '#6a4c9c' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#eef1f4',
        'surface-1': '#f6f8fa',
        'surface-2': '#fcfdfe',
        'text-primary': '#14181d',
        'text-secondary': '#353c45',
        'text-muted': '#4f5864',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#14181e',
        'surface-1': '#1a1f26',
        'surface-2': '#20262e',
        'surface-3': '#262c35',
        'text-primary': '#eef1f5',
        'text-secondary': '#c9cfd8',
        'text-muted': '#a7afba',
      },
    },
  },
})

// Larger type, normal line spacing, extra room between blocks.
const STYLE: ThemeStyle = {
  Text: { fontFamily: ['sans'], fontSize: 16, lineHeight: 22, letterSpacing: 0.2 },
  Heading: { fontFamily: ['sans'], fontWeight: 'semibold', lineHeight: 26 },
  AssistantMessage: { paddingY: 6 },
}

const LOOK: ThemeSetArgs = { colors: theme, style: STYLE }

export const register: Register = on => {
  on('prompt.compose', async ($, e, next) => {
    const result = await next(e)

    return { sections: [...result.sections.filter(s => s.id !== WRITING.id), WRITING] }
  })

  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    try {
      const set = await $.theme.set(LOOK)

      if (!set.isDrawn) {
        $.ui.status(set.reason)
      }
    } catch (error) {
      $.ui.log(String(error))
      await $.theme.set({ colors: theme })
    }

    return next(e)
  })
}
