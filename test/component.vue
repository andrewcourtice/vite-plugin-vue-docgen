<template>
    <div class="test-component">
        <slot name="title">{{ title }}</slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({

    props: {

        title: {
            type: String,
            default: 'Welcome'
        },

        colour: {
            type: String,
            default: 'blue'
        }

    }

});
</script>