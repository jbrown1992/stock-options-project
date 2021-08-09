import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/option";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import OptionForm from "./OptionForm";
import Stocks from "./Stocks";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Options = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllOptions()
    }, [])//componentDidMount

    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteOption(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid items>
                    <OptionForm {...({ currentId, setCurrentId })} />
                </Grid>
            </Grid>
            <Grid container>

                <Grid item>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Ticker</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Strike Price</TableCell>
                                    <TableCell>Stock Price</TableCell>
                                    <TableCell>Premium</TableCell>
                                    <TableCell>Expiry Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.optionList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.ticker}</TableCell>
                                            <TableCell>{record.type}</TableCell>
                                            <TableCell>{record.strikePrice}</TableCell>
                                            <TableCell>{record.stockPrice}</TableCell>
                                            <TableCell>{record.premium}</TableCell>
                                            {/* TODO: Fix this */}
                                            <TableCell>{record.expiryDate.split('T')[0]}</TableCell>
                                            <TableCell>{record.status}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>                   
                </Grid>


            </Grid>
            <Grid container>
            <Stocks />
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    optionList: state.option.list
})

const mapActionToProps = {
    fetchAllOptions: actions.fetchAll,
    deleteOption: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Options));