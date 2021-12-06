<template>
    <div>
        <DataTable :value="animals" :scrollable="true" scrollHeight="600px">
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
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    name: 'AnimalsAllComponent',
    components: {
        DataTable,
        Column,
    },
    data() {
        return {
            animals: [],
        };
    },
    beforeMount() {
        try {
            axios
                .get('http://localhost:5050/animals' + '/getAllAnimals')
                .then(res => {
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

<style>
.formContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #64686b;
    padding: 2%;
    min-height: 100vh;
}

.formHeading {
    font-size: 28px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    color: #64686b;
}
.registerBtn {
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #64686b;
}
.formCard {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.formContainer .formCard .formInput {
    width: 50%;
    padding: 10px 10px 35px 10px !important;
}
</style>
