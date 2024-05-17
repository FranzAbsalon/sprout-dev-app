<script setup lang="ts">
// Imports
import { Input } from "./ui/input";

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
            <!-- Logo -->
            <img src="/public/images/sprout-logo.webp" alt="Sprout HR Logo">

            <!-- Navigation -->
            <div class="flex gap-7 text-grayText items-center">
                <!-- Menu -->
                <ul class="flex gap-4 list-none ">
                    <li v-for="(navText) in menuItems" :key="navText">
                        <a>
                            <span class="cursor-pointer">
                                {{ navText }}
                                <font-awesome-icon icon="caret-down" class="px-1"/>
                            </span>
                        </a>
                    </li>
                </ul>
                <!-- Search Bar -->
                <div class="relative w-auto max-w-sm items-center">
                    <Input id="search" type="text" placeholder="Search Employee..." class="input px-3 bg-transparent" />
                    <span class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
                        <font-awesome-icon icon="magnifying-glass"/>
                    </span>
                </div>
                <!-- Profile -->
                <div class="flex gap-2 items-center">
                    <span class="block w-9 h-9 bg-grayText rounded-full"></span>
                    <p class="text-[#2FC7E2]">
                        Admin
                        <font-awesome-icon icon="caret-down" class="px-1"/>
                    </p>
                </div>
            </div>  
        </nav>
    </div>
</template>

<style scoped>
input::placeholder{
    color: #DDDDDD;
}
</style>
