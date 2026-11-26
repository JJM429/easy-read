# easy-read

A Claude Code mod that makes Claude's replies easier to read.

- **Writing rules:** Claude puts the answer first, keeps paragraphs short, uses plain words, explains technical terms, uses bullets and headings where they help, and cuts filler.
- **Look (desktop and mobile apps):** a calm, high-contrast theme for light and dark mode, with 16pt sans-serif text and extra space between blocks of a reply.

## Install

Replace `<owner>` with the GitHub account that holds this repository.

In the desktop app: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `<owner>/easy-read`, then **Add plugin**.

At the prompt of a terminal session:

```
/plugin install easy-read --marketplace <owner>/easy-read
```

From a shell:

```bash
claude plugin install easy-read --marketplace <owner>/easy-read
```

Answer `y` to add the marketplace, then choose the user scope so it applies to every session.
