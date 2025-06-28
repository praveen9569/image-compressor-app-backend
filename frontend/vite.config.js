export default {
  root: '.',
  server: {
    port: 5173,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      }
    }
  }
}
