FROM node:16

WORKDIR /working-dir

# Only copy dependency files and run yarn install before copying source files. This lets Docker cache the dependency installation stage.
COPY package.json ./
COPY yarn.lock ./
COPY ./.yarn/. ./.yarn/
COPY .yarnrc.yml ./
COPY web/package.json web/
COPY api/package.json api/
COPY packages/ledger-sdk/package.json packages/ledger-sdk/
COPY packages/ledger/package.json packages/ledger/
COPY packages/shared-data/package.json packages/shared-data/
COPY packages/supertokens/package.json packages/supertokens/
COPY packages/temporal-cluster/package.json packages/temporal-cluster/
COPY packages/temporal-worker/package.json packages/temporal-worker/

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000


