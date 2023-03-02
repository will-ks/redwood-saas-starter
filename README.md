# Redwood SAAS Starter

This project is a starter boilerplate for creating SAAS projects with Redwood. Currently it is focused on my own personal needs, but it may be useful for others too.

Features:
- TypeScript
- Personally configured ESLint
- Temporal for workflows
- Ledger for internal transactions
- Mantine for UI
- Vanilla Extract for styling
- Supertokens for Auth
- Docker + Docker compose

## Gettings started

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
