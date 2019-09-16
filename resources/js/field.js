Nova.booting((Vue, router, store) => {
    Vue.component('index-nova-password-generation-field', require('./components/IndexField'))
    Vue.component('detail-nova-password-generation-field', require('./components/DetailField'))
    Vue.component('form-nova-password-generation-field', require('./components/FormField'))
})
