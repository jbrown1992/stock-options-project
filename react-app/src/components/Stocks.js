import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/stock";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
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

const Stocks = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllStocks()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    // const onDelete = id => {
    //     if (window.confirm('Are you sure to delete this record?'))
    //         props.deleteOption(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    // }
    return (
                <Grid item>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Ticker</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Average Price</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.stockList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.ticker}</TableCell>
                                            <TableCell>{record.quantity}</TableCell>
                                            <TableCell>{record.averagePrice}</TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
    );
}

const mapStateToProps = state => ({
    stockList: state.stock.list
})

const mapActionToProps = {
    fetchAllStocks: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Stocks));