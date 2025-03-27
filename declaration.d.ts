// declaration.d.ts

///<reference types="vite-plugin-pwa/client" />

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
