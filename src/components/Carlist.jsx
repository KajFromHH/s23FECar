import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar"

function Carlist() {
    //state variables
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    //Ag Grid Columns.

    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        {
            cellRenderer: row => {
                console.log(row.original) //row.data.cars [katso DELETE -funktio esimerkkia] ei toiminut myoskaan, tulee jatkuvasti 'undefined'
                return (
                    <EditCar updateCar={updateCar} car={row.original} />
                );
            }, width: 120
        },
        {
            cellRenderer: params =>

                <Button size="small" color="error" onClick={() => deleteCar(params)} >
                    DELETE
                </Button >,
            width: 120
        }
    ]

    //Search and fetch cars' info from REST API.
    // // URL for car API.
    const REST_URL = 'https://carrestapi.herokuapp.com/cars/';

    // // 
    useEffect(() => getCars(), []);

    //DELETE -function.
    const deleteCar = (params) => {
        console.log("Parameters " + params.data._links.car.href)
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                setMsg('Car is deleted successfully!');
                setOpen(true);
                getCars();

                if (response.ok) {
                    getCars();
                } else {
                    Alert("Something went wrong!");
                }
            })
            .catch(error => console.error(error));
    };


    //UPDATE -function. or Update REST API function
    const updateCar = (car) => {
        fetch(REST_URL,
            {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(car)
            })
            .then(response => {
                if (response.ok)
                    getCars();
                else
                    alert('Something went wrong.');
            })
            .catch(err => console.error(err))
    }

    //GET RESTrequest. I.e., getCars from REST api call.

    const getCars = () => {

        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error));

    }

    //ADD RESTrequest. I.e., addCar from REST api call.
    const addCar = (car) => {

        fetch(REST_URL,
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(car)
            })
            .then(response => {
                if (response.ok)
                    getCars();
                else
                    alert('Something went wrong.');
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material"
                style={{ height: '700px', width: '95%', margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}

                >

                </Snackbar>
            </div>
        </>
    )

}

export default Carlist;