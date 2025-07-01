// components/EditorSection.js
import React, { useState } from 'react';
import { Box, TextField, Button, Chip, IconButton, Typography } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { icons } from './icons';
import { sectionTypes } from './constants';

export default function EditorSection({ 
  section, 
  onUpdate, 
  onDelete, 
  onAIFill,
  dragHandleProps 
}) {
  const [newSkill, setNewSkill] = useState('');
  const sectionConfig = sectionTypes[section.type] || {};

     const handleChange = (field, value) => {
    onUpdate(section.id, field, value);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...(section.data.skills || []), newSkill.trim()];
      handleChange('skills', updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...section.data.skills];
    updatedSkills.splice(index, 1);
    handleChange('skills', updatedSkills);
  };

  const renderFormFields = () => {
    switch (section.type) {
      case 'experience':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Должность"
                value={section.data.position || ''}
                onChange={(e) => handleChange('position', e.target.value)}
              />
              <TextField
                fullWidth
                label="Компания"
                value={section.data.company || ''}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </Box>
            <TextField
              fullWidth
              label="Период"
              value={section.data.period || ''}
              onChange={(e) => handleChange('period', e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Описание"
              value={section.data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Box>
        );

      case 'education':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Учебное заведение *"
                value={section.data.institution || ''}
                onChange={(e) => handleChange('institution', e.target.value)}
              />
              <TextField
                fullWidth
                label="Специальность *"
                value={section.data.specialty || ''}
                onChange={(e) => handleChange('specialty', e.target.value)}
              />
            </Box>
            <TextField
              fullWidth
              label="Период обучения *"
              value={section.data.period || ''}
              onChange={(e) => handleChange('period', e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Дополнительная информация"
              placeholder="Опишите изученные предметы, достижения, дипломную работу..."
              value={section.data.additionalInfo || ''}
              onChange={(e) => handleChange('additionalInfo', e.target.value)}
            />
          </Box>
        );

      case 'skills':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Новый навык"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button
                variant="contained"
                onClick={addSkill}
                sx={{ minWidth: '40px' }}
              >
                <Add />
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {section.data.skills?.map((skill, i) => (
                <Chip
                  key={i}
                  label={skill}
                  onDelete={() => removeSkill(i)}
                />
              ))}
            </Box>
          </Box>
        );

      case 'certificates':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Название сертификата"
                value={section.data.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <TextField
                fullWidth
                label="Выдавший орган"
                value={section.data.issuer || ''}
                onChange={(e) => handleChange('issuer', e.target.value)}
              />
            </Box>
            <TextField
              fullWidth
              label="Дата получения"
              value={section.data.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Описание"
              value={section.data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Box>
        );

      case 'about':
        return (
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Расскажите о себе"
            value={section.data.text || ''}
            onChange={(e) => handleChange('text', e.target.value)}
          />
        );

      default:
        return null;
    }
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
        borderColor: 'divider',
        position: 'relative'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        {/* Left side - Drag handle and title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            {...dragHandleProps}
            sx={{ 
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing'
              }
            }}
          >
            <icons.move fontSize="small" />
          </IconButton>
          
          {sectionConfig.icon && (
            <sectionConfig.icon 
              color={sectionConfig.color} 
              fontSize="small" 
            />
          )}
          
          <Typography variant="subtitle1">
            {sectionConfig.title || section.type}
          </Typography>
        </Box>
        
        {/* Right side - Action buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            onClick={() => onAIFill(section.id)}
            startIcon={<icons.edit fontSize="small" />}
            size="small"
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            AI Заполнить
          </Button>
          
          <IconButton
            onClick={() => onDelete(section.id)}
            size="small"
            color="error"
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      {renderFormFields()}
    </Box>
  );
}