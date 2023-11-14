import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

function AddCar(props) {
    //state
    const [car, setCar] = useState({ brand: '', model: '' });

    //Check if dialougue is open or not.
    const [open, setOpen] = useState(false);

    //Closing function.
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
            setOpen(false);
    }
    //Save function.
    const handleSave = () => {
        props.addCar(car);
        setOpen(false); //close dialog window
    }
    const handleInputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }
    //dialog (add form) (default: hidden)

    //addbutton (default: active, public)

    return (
        <>
            <Button
                onClick={() => setOpen(true)}>Insert New Car</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle
                    New Car Form
                >
                </DialogTitle>

                <DialogContent>
                    <TextField
                        label='Brand'
                        name='brand'
                        value={car.brand}
                        onChange={handleInputChanged}
                    >
                    </TextField>
                    <TextField
                        label='Model'
                        name='model'
                        value={car.model}
                        onChange={handleInputChanged}
                    >
                    </TextField>


                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleSave}>
                        Save
                    </Button>
                    <Button
                        onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );

}

export default AddCar;