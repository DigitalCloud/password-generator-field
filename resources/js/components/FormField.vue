<template>
    <default-field :field="field">
        <template slot="field">
            <div class="flex relative input-password-generate">
                <input :id="field.name" type="text"
                       class="w-full form-control form-input form-input-bordered"
                       :class="errorClasses"
                       :placeholder="field.name"
                       autocomplete="off"
                       v-model="value"/>
                <div class="field-icons absolute h-full pin-r pr-2">
                    <button type="button" class="button"  value="***" v-on:click="generate()">
                        <svg class="icon text-80 mr-2" width="26px" height="23px" viewBox="0 0 26 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="icon-generate-x" fill="#506175" fill-rule="nonzero">
                                    <path d="M4.8475593,16.1726859 C6.46862836,19.0831989 9.54418837,21.0000039 12.999586,21.0000039 C17.3090094,21.0000039 21.031762,18.0180594 22.0731571,13.8370355 C22.206516,13.3016223 22.7422185,12.9773223 23.2696821,13.1126911 C23.7971457,13.2480598 24.1166307,13.791836 23.9832718,14.3272491 C22.7220321,19.3909114 18.2164369,22.999917 12.999586,22.999917 C8.71317078,22.999917 4.91032409,20.5639516 2.98935914,16.8921521 L1.92403569,20.2641953 C1.75789504,20.7900764 1.20323022,21.0796738 0.685157137,20.9110292 C0.167084055,20.7423846 -0.11821355,20.1793603 0.0479271009,19.6534792 L1.94317819,13.6544856 C2.13141501,13.058664 2.80640172,12.7827048 3.34892222,13.0797661 L8.75266998,16.0386302 C9.23150673,16.300821 9.41028878,16.9073927 9.15199087,17.3934461 C8.89369296,17.8794995 8.29612726,18.0609761 7.81729052,17.7987853 L4.8475593,16.1726859 Z" id="arrow-bottom"></path>
                                    <path d="M13.0004926,1.99991305 C8.69106914,1.99991305 4.96831656,4.98185759 3.9269214,9.16288152 C3.79356253,9.69829466 3.25786007,10.0225947 2.73039647,9.88722594 C2.20293288,9.75185718 1.88344788,9.20808101 2.01680675,8.67266788 C3.27804645,3.60900562 7.78364164,0 13.0004926,0 C17.2869078,0 21.0897545,2.43596539 23.0107194,6.10776488 L24.0760429,2.73572166 C24.2421835,2.20984057 24.7968483,1.92024317 25.3149214,2.08888777 C25.8329945,2.25753237 26.1182921,2.82055669 25.9521514,3.34643778 L24.0569004,9.34543142 C23.8686635,9.94125301 23.1936768,10.2172122 22.6511563,9.92015091 L17.2474086,6.96128681 C16.7685718,6.69909603 16.5897898,6.09252427 16.8480877,5.60647086 C17.1063856,5.12041745 17.7039513,4.93894093 18.182788,5.20113171 L21.1525192,6.82723112 C19.5314502,3.91671811 16.4558902,1.99991305 13.0004926,1.99991305 Z" id="arrow-top"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <div class="tooltip">
                        <button class="copyButtton" type="button" v-on:click="copyPassword()">
                            <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                            <svg focusable="false" data-icon="clone" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 class="icon text-80 svg-inline--fa fa-clone fa-w-16 fa-9x">
                                <path fill="currentColor"
                                      d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <p v-if="hasError" class="my-2 text-danger">
                {{ firstError }}
            </p>
        </template>
    </default-field>
</template>

<script>
    import { FormField, HandlesValidationErrors } from 'laravel-nova'
    export default {
        mixins: [FormField, HandlesValidationErrors],
        props: ['resourceName', 'resourceId', 'field'],
        methods: {
            generate() {
                var chars = '';
                if (this.field.exclude_rules && this.field.exclude_rules.length > 0){
                    for (var j = 0; j < this.field.exclude_rules.length; j++){
                        this.field.exclude_rules[j] =  this.field.exclude_rules[j].toLowerCase();
                    }
                    if (this.field.exclude_rules.includes('symbols')
                        && this.field.exclude_rules.includes('numbers')
                        && this.field.exclude_rules.includes('uppercase')
                        && this.field.exclude_rules.includes('lowercase')){
                        alert('Include at least one characters type! Symbols, Numbers, Lowercase, Uppercase');
                        return false;
                    }
                    if (!this.field.exclude_rules.includes('symbols')){
                        chars += '!@#$%^&*()-+<>'
                    }
                    if (!this.field.exclude_rules.includes('numbers')){
                        chars += '1234567890'
                    }
                    if (!this.field.exclude_rules.includes('uppercase')){
                        chars += 'ABCDEFGHIJKLMNOP'
                    }
                    if (!this.field.exclude_rules.includes('lowercase')){
                        chars += 'abcdefghijklmnopqrstuvwxyz'
                    }
                } else{
                    chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>1234567890ABCDEFGHIJKLMNOP';
                }
                var pass = "";
                var length = 10;
                if (this.field.length > 0){
                    length = this.field.length;
                }
                for (var x = 0; x < length; x++) {
                    var i = Math.floor(Math.random() * chars.length);
                    pass += chars.charAt(i);
                }
                this.value = pass;
            },
            copyPassword() {
                var copyText = document.getElementById(this.field.name);
                var tooltip = document.getElementById("myTooltip");
                if (copyText.value.length > 0) {
                    copyText.select();
                    document.execCommand("copy");
                    tooltip.innerHTML = "Copied";
                }
                else{
                    tooltip.innerHTML = "Generate a password first";
                }
            },
            /*
             * Set the initial, internal value for the field.
             */
            setInitialValue() {
                this.value = this.field.value || ''
            },
            /**
             * Fill the given FormData object with the field's internal value.
             */
            fill(formData) {
                formData.append(this.field.attribute, this.value || '')
            },
            /**
             * Update the field's internal value.
             */
            handleChange(value) {
                this.value = value
            }
        }
    }
</script>
