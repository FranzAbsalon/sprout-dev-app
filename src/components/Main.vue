<script setup>
// Imports
import { Button } from '@/components/ui/button'

</script>

<template>
    <div class="pt-20 px-6 w-3/4">
        <main class="my-6">
            <!-- Header Text Section -->
            <section class="flex justify-between mb-6">
                <div class="flex items-center gap-2">
                    <font-awesome-icon icon="calendar-check" class="text-primaryColor"/>
                    <h1 class="font-medium">Date Range</h1>
                </div>
                <div class="flex">
                    <Button class="bg-primaryColor flex items-center gap-3 rounded-none rounded-l-lg hover:bg-hoveredButton">
                        Active Logs
                        <font-awesome-icon icon="check" />
                    </Button>
                    <Button class="bg-transparent border-primaryColor border-2 text-primaryColor flex items-center gap-3 rounded-none rounded-r-lg hover:bg-slate-50">
                        Deleted Logs
                    </Button>
                </div>
            </section>

            <!-- Table Section -->
            <section class="border-2 rounded-lg h-[570px]">
                <div class="flex flex-col h-auto">
                    <div class="grid justify-items-center py-36">
                        <img src="/public/images/no-payslip.webp" alt="Sprout HR Logo">
                        <h3 class="font-medium text-3xl">No attendance logs to show</h3>
                        <p class="text-lg">Get started by searching for the logs</p>
                    </div>
                    <footer class="border-t-2 p-6">

                    </footer>
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped>
    
</style>