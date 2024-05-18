<script setup>
// Imports
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap';
import { nextTick, ref } from 'vue';
import Main from '@/components/Main.vue';
import Exported from '@/components/ExportedFiles.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Reactive State
    // State for Filters Section
    const buttonText = ref('Show All');
    const contentContainer = ref(null);
    const content = ref(null);

    const toggleButton = () => {
        gsap.to(content.value, { x: 100, opacity: 0, duration: 0.25, onComplete: async () => {
            buttonText.value = buttonText.value === 'Show All' ? 'Hide All' : 'Show All';
            await nextTick();  // Wait for DOM to update
            // Animate the text in after content has changed
            gsap.fromTo(content.value, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25 });
        }});
    };

    // For Buttons
    const attendanceLogs = ref(true);
    const activeButton = ref('attendance');

    const showAttendanceLogs = () => {
        attendanceLogs.value = true;
        activeButton.value = 'attendance';
    };

    const showExportedFiles = () => {
        attendanceLogs.value = false;
        activeButton.value = 'exported';
    };

    // For Dropdowns
    const companies = ref([
        { name: "Sprout Solutions", value: "sprout solutions" },
        { name: "McDolibee", value: "mcDolibee" },
    ]);

    const department = ref([
        { name: "All", value: "all" },
        { name: "Administration", value: "administration" },
        { name: "IT", value: "it" },
        { name: "Product", value: "product" },
        { name: "Engineering", value: "engineering" },
    ]);

    const locations = ref([
        { name: "All", value: "all" },
        { name: "Mandaluyong", value: "mandaluyong" },
        { name: "BGC", value: "bgc" },
    ]);

    const employees = ref([
        { name: "John Francis Absalon", companies: "Sprout Solutions", department: "IT", locations: "BGC"},
        { name: "Darlene Absalon", companies: "Sprout Solutions", department: "Engineering", locations: "BGC"},
        { name: "Peter Johns", companies: "McDolibee", department: "Administration", locations: "Mandaluyong"},
        { name: "Patricia Dela Paz", companies: "Sprout Solutions", department: "Product", locations: "BGC"},
        { name: "Franz Medalla", companies: "Sprout Solutions", department: "Engineering", locations: "BGC"},
    ]);

</script>

<template>
    <div class="dynamic-section pt-20 w-1/4 h-screen border-slate-400 border-r-2 text-primaryText flex flex-col overflow-y-auto">
        <!-- Heading Text Section -->
        <section class="px-8">
            <h1 class="mt-6 text-2xl font-medium">Manage Attendance</h1>
            <h2 class="my-3">Attendance management is where you can generate, add, edit and export the logs of the employees.</h2>
            <menu class="py-3">
                <button 
                    class="w-full p-4 rounded-md flex items-center gap-3 cursor-pointer hover:bg-[#e8fff0ff]/50" 
                    :class="{'bg-[#e8fff0ff]': activeButton === 'attendance','text-black/50': activeButton !== 'attendance'}"
                    @click="showAttendanceLogs"
                >
                    <font-awesome-icon icon="calendar-check" :class="{'text-primaryColor': activeButton === 'attendance'}"/>
                    <h3 class="font-medium">Attendance Logs</h3>
                </button>
                <button 
                    class="p-4 rounded-md flex items-center gap-3 w-full cursor-pointer hover:bg-[#e8fff0ff]/50"
                    :class="{'bg-[#e8fff0ff]': activeButton === 'exported','text-black/50': activeButton !== 'exported'}"  
                    @click="showExportedFiles"
                > 
                    <font-awesome-icon icon="download" :class="{'text-primaryColor': activeButton === 'exported'}"/>
                    <h3 class="font-medium">Exported Files</h3>
                </button>
            </menu>
        </section>
        <!-- Form Section -->
        <section class="flex-grow border-t-2">
            <form v-if="attendanceLogs" action="" class="px-8 py-5">
                <h3 class="font-medium">DATE RANGE</h3>
                <menu class="py-4">Dito yung Calendar</menu>
                <menu class="py-4">Dito yung Calendar</menu>
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-medium">FILTERS</h3>
                    <button @click.prevent="toggleButton" class="text-[#0F6EEB] font-medium">{{ buttonText }}</button>
                </div>
                <section ref="contentContainer">
                    <div v-if="buttonText === 'Show All'" ref="content" class="content">
                        <p>
                            <font-awesome-icon icon="building" class="pe-2 w-3"/>
                            SPROUT SOLUTIONS
                        </p>
                        <p>
                            <font-awesome-icon icon="users" class="pe-2 w-3"/>
                            ALL
                        </p>
                        <p>
                            <font-awesome-icon icon="location-dot" class="pe-2 w-3"/>
                            ALL
                        </p>
                        <p>
                            <font-awesome-icon icon="user" class="pe-2 w-3"/>
                            ALL
                        </p>
                    </div>
                    <div v-else ref="content" class="content">
                        <section class="grid gap-y-2">
                            <!-- Company Dropdown -->
                            <Select>
                                <SelectTrigger class="w-[315px]">
                                    <SelectValue placeholder="Company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem 
                                        v-for="company in companies" 
                                        :key="company.value"
                                        :value="company.value"
                                    >
                                    {{ company.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <!-- Department Dropdown -->
                            <Select>
                                <SelectTrigger class="w-[315px]">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem 
                                        v-for="dept in department" 
                                        :key="dept.value"
                                        :value="dept.value"
                                    >
                                    {{ dept.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <!-- Location Dropdown -->
                            <Select>
                                <SelectTrigger class="w-[315px]">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem 
                                        v-for="location in locations" 
                                        :key="location.value"
                                        :value="location.value"
                                    >
                                    {{ location.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <!-- Employee Dropdown -->
                            <Select>
                                <SelectTrigger class="w-[315px]">
                                    <SelectValue placeholder="Employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem 
                                        v-for="employee in employees" 
                                        :key="employee.value"
                                        :value="employee.value"
                                    >
                                    {{ employee.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </section>
                    </div>
                </section>
            </form>
        </section>
        <!-- Sidebar Footer with Buttons -->
        <footer v-if="attendanceLogs" class="grid justify-items-center border-t-2 p-6 gap-y-2">
            <Button class="gap-3 bg-primaryColor w-full h-12 hover:bg-hoveredButton text-white">
                <font-awesome-icon icon="magnifying-glass"/>Search
            </Button>
            <Button class="gap-3 bg-transparent text-black/30 border-2 w-full h-12 hover:bg-slate-50">
                <font-awesome-icon icon="download"/>Export
            </Button>
        </footer>
    </div>
    <main v-if="attendanceLogs">
        <Main />
    </main>
    <main v-else>
        <Exported />
    </main>
</template>

<style scoped>
.content-container {
  overflow: hidden;
}

section p{
    display: flex;
    align-items: center;
    gap: 3px;
    color: gray;
}

.content {
  display: inline-block;
  white-space: nowrap;
}

.dynamic-section{
    position: fixed;
}
.dynamic-section::-webkit-scrollbar {
  width: 5px; 
}

.dynamic-section::-webkit-scrollbar-track {
  background: transparent; 
}

.dynamic-section::-webkit-scrollbar-thumb {
  background: #17AD49; 
}

.dynamic-section::-webkit-scrollbar-thumb:hover {
  background: #27974c; 
}
</style>