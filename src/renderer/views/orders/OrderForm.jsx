import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderDate: "",
    deliveryDate: "",
    orderNumber: "",
    clientRef: "",
    distributor: "",
    name: "",
    phone: "",
    color: "",
    edgeType: "",
    handleType: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTableRow = () => {
    setTableData([...tableData, { code: "", units: "", width: "", depth: "", height: "", open: "", description: "" }]);
  };

  const handleTableChange = (index, event) => {
    const updatedRows = [...tableData];
    updatedRows[index][event.target.name] = event.target.value;
    setTableData(updatedRows);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, margin: "auto", mt: 5 }}>
      <h2>Formulario de Pedido</h2>
      <Grid container spacing={2}>
        {[
          { label: "Fecha de Pedido", name: "orderDate", type: "date" },
          { label: "Fecha de Entrega", name: "deliveryDate", type: "date" },
          { label: "Orden de Fabricación", name: "orderNumber" },
          { label: "Ref Cliente", name: "clientRef" },
          { label: "Distribuidor", name: "distributor" },
          { label: "Nombre", name: "name" },
          { label: "Teléfono", name: "phone", type: "tel" },
        ].map((field) => (
          <Grid item xs={6} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          </Grid>
        ))}

        {/* Selects */}
        {[
          { label: "Color", name: "color", options: ["Blanco", "Negro", "Madera"] },
          { label: "Tipo de Canto", name: "edgeType", options: ["PVC", "Aluminio", "ABS"] },
          { label: "Tipo de Tirador", name: "handleType", options: ["Metálico", "Integrado", "Sin tirador"] },
        ].map((select) => (
          <Grid item xs={6} key={select.name}>
            <TextField
              fullWidth
              select
              label={select.label}
              name={select.name}
              value={formData[select.name]}
              onChange={handleInputChange}
            >
              {select.options.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
      </Grid>

      {/* Tabla de Productos */}
      <h3 style={{ marginTop: "20px" }}>Productos</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["Código", "Unidades", "Ancho", "Fondo", "Alto", "Apert", "Descripción"].map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>
                    <TextField
                      fullWidth
                      name={key}
                      value={row[key]}
                      onChange={(e) => handleTableChange(index, e)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={addTableRow} variant="contained" sx={{ mt: 2 }}>
        Agregar Fila
      </Button>
    </Paper>
  );
};

export default OrderForm;
