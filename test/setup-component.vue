<template>
    <div class="test-component">
        <slot name="title">{{ title }}</slot>
    </div>
</template>

<script lang="ts" setup>
import {
    defineProps,
} from 'vue';

defineProps({

    title: {
        type: String,
        default: 'Welcome'
    },

    colour: {
        type: String,
        default: 'blue'
    }

});
</script>