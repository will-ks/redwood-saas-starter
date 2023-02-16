# web

## Styling

Style theme values are set up in `data/theme`.

General styling rules:

- Where possible, use standard Mantine UI components with their default styles.
- When you need to override simple component styles, use inline styles.
- Use [vanilla-extract](https://vanilla-extract.style/documentation/getting-started/) for more complex overrides, eg.
  when you need to use media queries, pseudoselectors or take advantage of the cascade.
