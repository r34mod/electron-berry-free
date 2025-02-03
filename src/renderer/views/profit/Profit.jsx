import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';   
import axios from 'axios';

const Profit = () => {
    const [profit, setProfit] = useState([]);
    const [newProfit, setNewProfit] = useState({ amount: 0, description: '', date: '' });
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        fetchProfit();
    }, [selectedMonth]);

    const fetchProfit = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/profit?month=${selectedMonth}`);
            setProfit(response.data);
        }catch(error){
            console.error('Error al obtener beneficios:', error);
        }
    }

    const handleAddProfit = async () => {
        if(newProfit.amount && newProfit.description && newProfit.date){
            try{
                await axios.post('http://localhost:5000/profit', newProfit);
                fetchProfit();
                setNewProfit({ amount: '', description: '', date: '' });
            }catch(error){
                console.error('Error al agregar beneficio:', error);
            }
        }
    };

    const filteredProfit = profit.filter(p => {
        const profitDate = new Date(p.date).getMonth() + 1;
        console.log("MES "+profitDate);
        return profitDate === selectedMonth;
    })

    return(
        <diV>
            <h2>Gestion de beneficios</h2>
            <div style={{ marginBottom: '20px'}}>
                <TextField
                    type='number'
                    label='Cantidad'
                    variant='outlined'
                    value={newProfit.amount}
                    onChange={e => setNewProfit({ ...newProfit, amount: e.target.value })}
                    style={{ marginRight: '10px'}}
                    />
                <TextField
                    label='Descripción'
                    variant='outlined'
                    value={newProfit.description}
                    onChange={e => setNewProfit({ ...newProfit, description: e.target.value })}
                    style={{ marginRight: '10px'}}
                    />
                <TextField
                    type='date'
                    label='Fecha'
                    variant='outlined'
                    value={newProfit.date}
                    onChange={e => setNewProfit({ ...newProfit, date: e.target.value })}
                    style={{ marginRight: '10px'}}
                    />
                <Button variant='contained' color='primary' onClick={handleAddProfit}>Agregar beneficio</Button>
            </div>

            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
            {[
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ].map((month, index) => (
                <MenuItem key={index + 1} value={index + 1}>{month}</MenuItem>
            ))}
            </Select>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>IVA</TableCell>
                            <TableCell>Descripción</TableCell>
                            
                            <TableCell>Fecha</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProfit.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>{p.amount}</TableCell>
                                <TableCell>{p.amount * 0.21}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                
                                <TableCell>{p.date}</TableCell>
                                <TableCell>{(p.amount * 1.21).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </diV>
    )
}

export default Profit;