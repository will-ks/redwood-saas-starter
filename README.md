# Redwood SAAS Starter

This project is a starter boilerplate for creating SAAS projects with Redwood. Currently it is focused on my own personal needs, but it may be useful for others too.

Features:
- TypeScript
- Personally configured strict ESLint rules
- [Temporal](https://temporal.io/) for workflows
- [Formance Ledger](https://github.com/formancehq/ledger) for internal transactions
- [Mantine](https://github.com/mantinedev/mantine) for UI
- [Vanilla Extract](https://github.com/vanilla-extract-css/vanilla-extract) for styling
- [Supertokens](https://supertokens.com/) for Auth
- Docker + Docker compose

## Gettings started

The project is built as a [copier](https://copier.readthedocs.io/en/stable/) template. This means you can start a project from the template and easily keep it updated when the starter template is updated.

- Install [copier CLI](https://copier.readthedocs.io/en/stable/):

  > Install Python 3.7 or newer (3.8 or newer if you're on Windows).
  > Install Git 2.27 or newer.
  > To use as a CLI app: `pipx install copier`

- Generate a project:

```
copier git@github.com:will-ks/redwood-saas-starter.git [project-name]
```

- To later pull updates:

```
copier update
```
