# 🌲 Redwood SAAS Starter

This project is a starter boilerplate for creating SAAS projects with [Redwood](https://redwoodjs.com/). 

Redwood provides a fantastic framework for rapidly building full stack React applications. 
This starter project builds on top of what Redwood offers, adding these opinionated features that are valuable for SAAS projects:

- Strict-mode TypeScript
- Opinionated strict ESLint rules
- [Temporal](https://temporal.io/) for workflows
- [Formance Ledger](https://github.com/formancehq/ledger) for internal transactions
- [Mantine](https://github.com/mantinedev/mantine) for UI components
- [Vanilla Extract](https://github.com/vanilla-extract-css/vanilla-extract) for styling
- Self-hosted [Supertokens](https://supertokens.com/) for Auth
- Docker + Docker compose + Nomad for containerisation & orchestration
- Github actions for CI / CD
- Role-based access control
- Organizations / Teams
- Some pre-designed pages for common features like sign in/up, user profiles and settings
- Opinionated generator improvements
- [coming soon] Payments system
- [coming soon] Notifications system
- [coming soon] Commenting system
- [coming soon] Invites system

Currently this project is primarily focused on my own personal needs, but it may be useful for others too.

# Getting started

The project is built as a [copier](https://copier.readthedocs.io/en/stable/) template. This means you can start a project from the template and easily keep it updated when the starter template is updated.

## Installation

- Install [copier CLI](https://copier.readthedocs.io/en/stable/):

  > Install Python 3.7 or newer (3.8 or newer if you're on Windows).
  > Install Git 2.27 or newer.
  > To use as a CLI app: `pipx install copier`

- Generate a project:

```
copier git@github.com:will-ks/redwood-saas-starter.git [project-name]
```

The generated project will have its own README.md file (see the template [README.md.jinja](https://github.com/will-ks/redwood-saas-starter/blob/main/README.md.jinja) which gives you instructions on how to use the project.

## Updates

- To pull upsteam updates in to your local project:

```
copier update
```
