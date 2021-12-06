<template>
    <div>
        <DataTable :value="animals" :scrollable="true" scrollHeight="400px">
            <Column
                field="animalBreed"
                header="Breed"
                style="min-width: 200px"
            ></Column>
            <Column
                field="animalDescription"
                header="Description"
                style="min-width: 200px"
            ></Column>
            <Column
                field="animalName"
                header="Name"
                style="min-width: 200px"
            ></Column>
            <Column
                field="animalType"
                header="Type"
                style="min-width: 200px"
            ></Column>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
export default {
    name: 'AnimalUserListComponent',
    components: {
        DataTable,
        Column,
    },
    data() {
        return {
            animals: [],
        };
    },
    mounted() {
        try {
            let userLoggedIn = localStorage.getItem('userId');
            axios
                .get('http://localhost:5050/animals/' + userLoggedIn)
                .then(res => {
                    console.log(res);
                    this.animals = res.data.animals;
                });
        } catch (err) {
            console.log(
                'Error during retrieving animals from database: ' + err.message
            );
        }
    },
};
</script>
