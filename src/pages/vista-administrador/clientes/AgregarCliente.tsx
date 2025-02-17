import React, { useEffect, useState } from 'react'
import ContenedorModal from '../../../components/admin-components/ContenedorModal';
import TituloModal from '../../../components/admin-components/TituloModal';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Cliente } from '../../../models/Cliente';
import { BotonesModal } from '../../../components/admin-components/Botones';
import { actualizarCliente, registrarCliente } from '../../../services/cliente-service';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  cliente: Cliente | null;
}

const AgregarCliente: React.FC<ModalProps> = ({ open, onClose, cliente }) => {

  const [formData, setFormData] = useState({
    idUsuario: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    idTipoDocumento: "",
    nroDocumento: "",
    telefono: "",
    direccion: "",
    correo: "",
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      idUsuario: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      idTipoDocumento: "",
      nroDocumento: "",
      telefono: "",
      direccion: "",
      correo: "",
    });
  }

  useEffect(() => {
    if (cliente) {
      setFormData({
        idUsuario: cliente.idUsuario.toString(),
        nombre: cliente.nombre,
        apellidoPaterno: cliente.apellidoPaterno,
        apellidoMaterno: cliente.apellidoMaterno,
        idTipoDocumento: cliente.usuTipoDoc.idTipoDocumento.toString(),
        nroDocumento: cliente.nroDocumento,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        correo: cliente.correo,
      });
    } else {
      handleLimpiarFormulario();
    }
  }, [cliente]);

  const handleRegistrarCliente = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { idUsuario, ...dataToSend } = formData; // Eliminar idUsuario del objeto a enviar

    try {
      await registrarCliente(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el cliente");
    }

  }

  const handleActualizarCliente = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { ...dataToSend } = formData;

    try {
      await actualizarCliente(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el cliente");
    }

  }

  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
  }

  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={700}
      alto={600}
    >
      <TituloModal titulo={cliente ? "Editar informacion del cliente" : "Registrar cliente"}/>
      <Box sx={{ px: 2, pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Apellido Paterno"
              variant="outlined"
              value={formData.apellidoPaterno}
              onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Apellido Materno"
              variant="outlined"
              value={formData.apellidoMaterno}
              onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="tipo-usuario">Tipo de usuario</InputLabel>
              <Select
                fullWidth
                labelId="tipo-usuario"
                label="Tipo de documento"
                variant="outlined"
                value={formData.idTipoDocumento}
                onChange={(e) => setFormData({ ...formData, idTipoDocumento: e.target.value })}
              >
                <MenuItem value={0} selected>Seleccionar</MenuItem>
                <MenuItem value={1}>DNI</MenuItem>
                <MenuItem value={2}>Carnet de extrangería</MenuItem>
                <MenuItem value={3}>Pasaporte</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Nro. Documento"
              variant="outlined"
              value={formData.nroDocumento}
              onChange={(e) => setFormData({ ...formData, nroDocumento: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="email"
              label="Correo"
              variant="outlined"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </Box>
      <BotonesModal
        objeto={cliente}
        accion={
          cliente 
          ? handleActualizarCliente
          : handleRegistrarCliente
        }
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarCliente;