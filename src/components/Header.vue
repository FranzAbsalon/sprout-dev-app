<script setup lang="ts">
// Imports

// Data
    const menuItems = [
        'My Requests',
        'My Team',
        'Company',
        'Administration Tools',
        'Maintenance',
    ];
</script>

<template>
    <div class="relative">
        <nav class="fixed w-full bg-secondaryColor flex justify-between items-center px-8 py-5">
            <img src="/public/images/sprout-logo.webp" alt="Sprout HR Logo">

            <div class="flex gap-6">
                <ul class="flex gap-6 list-none items-center">
                    <li v-for="(text) in menuItems" :key="text">
                        <a>
                            <span class="cursor-pointer">
                                {{ text }}
                                <font-awesome-icon icon="caret-down" class="px-1"/>
                            </span>
                        </a>
                    </li>
                </ul>
                <div>
                    <font-awesome-icon icon="magnifying-glass" />
                </div>
            </div>  
        </nav>
    </div>
</template>

<style scoped>

</style>
