<script setup>
// Imports
import { Button } from '@/components/ui/button'
import employees from '@/employeesData.json'
import { useVueTable, FlexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/vue-table';
import { h, ref } from 'vue';
import EditIcon from '@/components/ui/EditIcon.vue';
import LogDetails from '@/components/ui/LogDetails.vue'
import ProjectName from '@/components/ui/ProjectName.vue'
import Location from '@/components/ui/Location.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Functionality
    const data = ref(employees);

    // Data for Table Header
    const employeeData = [
        { accessorKey: 'name', header: 'NAME' },
        { accessorKey: 'date', header: 'DATE' },
        { accessorKey: 'time', header: 'TIME' },
        { accessorKey: 'in_out', header: 'IN/OUT' },
        { 
            accessorKey: 'log_details', 
            header: 'LOG DETAILS',
            cell: () => {
                return h(LogDetails)
            }
        },
        { 
            accessorKey: 'location', 
            header: 'LOCATION',
            cell: () => {
                return h(Location);
            }
        },
        { 
            accessorKey: 'project_name', 
            header: 'PROJECT NAME',
            cell: () => {
                return h(ProjectName);
            }
        },
        { 
            accessorKey: 'edit', 
            header: '', 
            cell: () => {
                return h(EditIcon);
            }
        },
    ];

    // For Page Size
    const itemsNumber = ref([
        { itemSize: 5, value: 5},
        { itemSize: 9, value: 9},
        { itemSize: 10, value: 10},
        { itemSize: 15, value: 15},
    ]);
    
    const table = useVueTable({
        data: data.value,
        columns: employeeData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // initialState: {
        //     pagination: {
        //         pageSize: 9,
        //     }
        // }
    });
    const placeholderSize = table.getState().pagination.pageSize;

    // For Custom Styling of Cell
    const cellCustomStyle = (cell) => {
        const column = cell.column.columnDef;
        if(column.accessorKey === 'in_out'){
            const value = cell.getValue();
            if(value === 'IN'){
                return{color: '#0F6EEB'};
            }
            else if(value === 'OUT'){
                return{color: '#FF7F00'};
            }
        }
        return {};
    }
</script>

<template>
    <div class="pt-20 px-6 ml-auto w-3/4">
        <main class="my-6">
            <!-- Header Text Section -->
            <section class="flex justify-between mb-6">
                <div class="flex items-center gap-2">
                    <font-awesome-icon icon="calendar-check" class="text-primaryColor"/>
                    <h1 class="font-medium">Date Range</h1>
                </div>
                <div class="flex">
                    <Button class="bg-primaryColor flex items-center gap-3 rounded-none rounded-l-lg hover:bg-hoveredButton text-white">
                        Active Logs
                        <font-awesome-icon icon="check" />
                    </Button>
                    <Button class="bg-transparent border-primaryColor border-2 text-primaryColor flex items-center gap-3 rounded-none rounded-r-lg hover:bg-slate-50">
                        Deleted Logs
                    </Button>
                </div>
            </section>

            <!-- Table Section -->
            <section class="border-2 rounded-md h-auto">
                <!-- <div class="flex flex-col h-auto">
                    <div class="grid justify-items-center py-36">
                        <img src="/public/images/no-payslip.webp" alt="Sprout HR Logo">
                        <h3 class="font-medium text-3xl">No attendance logs to show</h3>
                        <p class="text-lg">Get started by searching for the logs</p>
                    </div>
                    <footer class="border-t-2 p-6">

                    </footer>
                </div> -->
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <th 
                                v-for="header in headerGroup.headers" 
                                :key="header.id"
                                scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="row in table.getRowModel().rows" :key="row.id">
                            <td 
                                v-for="cell in row.getVisibleCells()" 
                                :key="cell.id"
                                class="whitespace-nowrap px-3 py-4 text-sm textgray-500 font-medium text-primaryText"   
                                :style="cellCustomStyle(cell)"
                            >
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex items-center justify-between space-x-4 px-4">
                    <div class="flex items-center gap-2 text-gray-500 mb-1">
                        <p>Items per page</p>
                        <Select>
                                <SelectTrigger class="w-auto">
                                    <SelectValue :placeholder="placeholderSize"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem 
                                        v-for="item in itemsNumber" 
                                        :key="item.value"
                                        :value="item.value"   
                                    >
                                    <button @click="table.setPageSize(15)">{{ item.itemSize }}</button>
                                    </SelectItem>
                                </SelectContent>
                        </Select>
                    </div>
                    <div class="flex items-center">
                        <!-- First Page -->
                        <Button 
                            class="bg-transparent disabled:opacity-50 disabled:cursor-not-allowed text-primaryColor hover:bg-slate-50"
                            @click="table.setPageIndex(0)"
                        >
                            <font-awesome-icon icon="backward" />
                        </Button>
                        <!-- Previous Page -->
                        <Button 
                            class="bg-transparent disabled:opacity-50 disabled:cursor-not-allowed text-primaryColor hover:bg-slate-50"
                            :disabled="!table.getCanPreviousPage()"
                            @click="table.previousPage()"
                        >
                            <font-awesome-icon icon="caret-left" />
                        </Button>
                        <!-- Page Count -->
                        <p class="text-gray-500">
                            Page <span class="px-5 py-1 mx-3 border-2 rounded-md">{{ table.getState().pagination.pageIndex + 1 }}</span> of {{ table.getPageCount() }}
                        </p>
                        <!-- Next Page -->
                        <Button 
                            class="bg-transparent disabled:opacity-50 disabled:cursor-not-allowed text-primaryColor hover:bg-slate-50"
                            :disabled="!table.getCanNextPage()"
                            @click="table.nextPage()"
                        >
                            <font-awesome-icon icon="caret-right" />
                        </Button>
                        <!-- Last Page -->
                        <Button 
                            class="bg-transparent disabled:opacity-50 disabled:cursor-not-allowed text-primaryColor hover:bg-slate-50"
                            @click="table.setPageIndex(table.getPageCount() - 1)"
                        >
                            <font-awesome-icon icon="forward" />
                        </Button>
                    </div>
                    <div class="text-gray-500">
                        <p>Showing {{ table.getState().pagination.pageIndex + 1 }}-{{ table.getPageCount() }} of {{ table.getFilteredRowModel().rows.length }}</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped>
    
</style>