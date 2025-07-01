 
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

export default function PersonalInfoEditor({ section, onUpdate }) {
  const handleChange = (field, value) => {
    onUpdate(section.id, field, value);
  };

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Личная информация</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Полное имя *"
            value={section.data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <TextField
            fullWidth
            label="Должность *"
            value={section.data.position || ''}
            onChange={(e) => handleChange('position', e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Email *"
            value={section.data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <TextField
            fullWidth
            label="Телефон"
            value={section.data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </Box>
        <TextField
          fullWidth
          label="Город"
          value={section.data.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Краткое описание"
          value={section.data.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </Box>
    </Box>
  );
}