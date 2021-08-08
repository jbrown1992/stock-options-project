import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/option";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    ticker: '',
    type: '',
    stockPrice: '',
    strikePrice: '',
    premium: '',
    commision: '',
    status: '',
    expiryDate: ''
}

const OptionForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //val
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ticker' in fieldValues)
            temp.ticker = fieldValues.ticker ? "" : "This field is required."
        if ('type' in fieldValues)
            temp.type = fieldValues.type ? "" : "This field is required."
        if ('stockPrice' in fieldValues)
            temp.stockPrice = fieldValues.stockPrice ? "" : "This field is required."
        if ('strikePrice' in fieldValues)
            temp.strikePrice = fieldValues.strikePrice ? "" : "This field is required."
        if ('premium' in fieldValues)
            temp.premium = fieldValues.premium ? "" : "This field is required."
        if ('commision' in fieldValues)
            temp.commision = fieldValues.commision ? "" : "This field is required."
        if ('status' in fieldValues)
            temp.status = fieldValues.status ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createoption(values, onSuccess)
            else
                props.updateoption(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.optionList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item>
                    <TextField
                        name="ticker"
                        variant="outlined"
                        label="Ticker"
                        value={values.ticker}
                        onChange={handleInputChange}
                        {...(errors.ticker && { error: true, helperText: errors.ticker })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.type && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Type</InputLabel>
                        <Select
                            name="type"
                            value={values.type}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="CALL">CALL</MenuItem>
                            <MenuItem value="PUT">PUT</MenuItem>
                        </Select>
                        {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
                    </FormControl>

                    <TextField
                        name="strikePrice"
                        variant="outlined"
                        label="Strike Price"
                        value={values.strikePrice}
                        onChange={handleInputChange}
                        {...(errors.strikePrice && { error: true, helperText: errors.strikePrice })}
                    />

                    <TextField
                        name="stockPrice"
                        variant="outlined"
                        label="Stock Price"
                        value={values.stockPrice}
                        onChange={handleInputChange}
                        {...(errors.stockPrice && { error: true, helperText: errors.stockPrice })}
                    />
                </Grid>
                <Grid item>
                    <form className={classes.container} noValidate>
                        <TextField
                            name="expiryDate"
                            label="Expiry Date"
                            type="date"
                            value={values.expiryDate}
                            onChange={handleInputChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Grid>
                <Grid item>

                    <TextField
                        name="premium"
                        variant="outlined"
                        label="Premium"
                        value={values.premium}
                        onChange={handleInputChange}
                        {...(errors.premium && { error: true, helperText: errors.premium })}
                    />
                    <TextField
                        name="commision"
                        variant="outlined"
                        label="Commission"
                        value={values.commision}
                        onChange={handleInputChange}
                        {...(errors.commision && { error: true, helperText: errors.commision })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.status && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Status</InputLabel>
                        <Select
                            name="status"
                            value={values.status}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                            <MenuItem value="ASSIGNED">ASSIGNED</MenuItem>
                            <MenuItem value="EXPIRED">EXPIRED</MenuItem>
                        </Select>
                        {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                    </FormControl>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    optionList: state.option.list
})

const mapActionToProps = {
    createoption: actions.create,
    updateoption: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(OptionForm));