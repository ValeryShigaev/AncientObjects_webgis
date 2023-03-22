const { createApp } = Vue
createApp({
data() {
  return {
    message: 'Hello Vue!',
    loading: true
  }
}
}).mount('#app')