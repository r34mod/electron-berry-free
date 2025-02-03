import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: 0, description: '', date: '' });
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        fetchExpenses();
    }, [selectedMonth]);

    const fetchExpenses = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/expenses?month=${selectedMonth}`);
            setExpenses(response.data);
        }catch(error){
            console.error('Error al obtener gastos:', error);
        }
    };

    const handleAddExpense = async () => {
        if(newExpense.amount && newExpense.description && newExpense.date){
            try{
                await axios.post('http://localhost:5000/expenses', newExpense);
                fetchExpenses();
                setNewExpense({ amount: '', description: '', date: '' });
            }catch(error){
                console.error('Error al agregar gasto:', error);
            }
        }
    };

    const filteredExpenses = expenses.filter(e => {
        const expenseDate = new Date(e.date).getMonth() + 1;
        return expenseDate === selectedMonth
    })


    return(
        <div>
            <h2>Gestion de gastos</h2>
            <div style={{ marginBottom: '20px'}}>
                <TextField
                    type="number"
                    label="Cantidad"
                    variant='outlined'
                    value={newExpense.amount}
                    onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                    style={{ marginRight: '10px'}}
                />
                <TextField
                    label="Descripción"
                    variant='outlined'
                    value={newExpense.description}
                    onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                    style={{ marginRight: '10px'}}
                />
                <TextField
                    type="date"
                    label="Fecha"
                    variant='outlined'
                    value={newExpense.date}
                    onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
                    style={{ marginRight: '10px'}}
                />
                <Button variant="contained" color="primary" onClick={handleAddExpense}>Agregar Gasto</Button>
            </div>

            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {[
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ].map((month, index) => (
                    <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                ))}
            </Select>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredExpenses.map((expenses) => (
                            <TableRow key={expenses.id}>
                                <TableCell>{expenses.amount}</TableCell>
                                <TableCell>{expenses.description}</TableCell>
                                <TableCell>{expenses.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Expenses;