import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function ResumePreview({ sections }) {
  const renderSection = (section) => {
    switch (section.type) {
      case 'personal':
        return (
          <Box key={section.id} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              Личная информация
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2
            }}>
              {section.data.name && (
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Имя
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: '500' }}>
                    {section.data.name}
                  </Typography>
                </Box>
              )}
              
              {section.data.position && (
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Должность
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: '500' }}>
                    {section.data.position}
                  </Typography>
                </Box>
              )}
              
              {section.data.email && (
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {section.data.email}
                  </Typography>
                </Box>
              )}
              
              {section.data.phone && (
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Телефон
                  </Typography>
                  <Typography variant="body1">
                    {section.data.phone}
                  </Typography>
                </Box>
              )}
              
              {section.data.city && (
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Город
                  </Typography>
                  <Typography variant="body1">
                    {section.data.city}
                  </Typography>
                </Box>
              )}
            </Box>
            
            {section.data.description && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  О себе
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {section.data.description}
                </Typography>
              </Box>
            )}
          </Box>
        );

      case 'experience':
        return (
          <Box key={section.id} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              Опыт работы
            </Typography>
            
            <Paper elevation={0} sx={{ 
              p: 2,
              mb: 2,
              bgcolor: 'background.paper',
              borderLeft: '2px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                {section.data.position}
              </Typography>
              
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                flexWrap: 'wrap',
                gap: 1
              }}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {section.data.company}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  fontStyle: 'italic'
                }}>
                  {section.data.period}
                </Typography>
              </Box>
              
              {section.data.description && (
                <Typography variant="body2" sx={{ 
                  mt: 1,
                  whiteSpace: 'pre-line'
                }}>
                  {section.data.description}
                </Typography>
              )}
            </Paper>
          </Box>
        );

      case 'education':
        return (
          <Box key={section.id} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              Образование
            </Typography>
            
            <Paper elevation={0} sx={{ 
              p: 2,
              mb: 2,
              bgcolor: 'background.paper',
              borderLeft: '2px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                {section.data.institution}
              </Typography>
              
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                flexWrap: 'wrap',
                gap: 1
              }}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {section.data.specialty}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  fontStyle: 'italic'
                }}>
                  {section.data.period}
                </Typography>
              </Box>
              
              {section.data.additionalInfo && (
                <Typography variant="body2" sx={{ 
                  mt: 1,
                  whiteSpace: 'pre-line'
                }}>
                  {section.data.additionalInfo}
                </Typography>
              )}
            </Paper>
          </Box>
        );

      case 'skills':
        return (
          <Box key={section.id} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              Навыки
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1
            }}>
              {section.data.skills?.filter(skill => skill.trim() !== '').map((skill, i) => (
                <Paper 
                  key={i} 
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    bgcolor: 'action.selected',
                    color: 'text.primary',
                    borderRadius: 4,
                    fontSize: '0.8125rem',
                    fontWeight: '500'
                  }}
                >
                  {skill}
                </Paper>
              ))}
            </Box>
          </Box>
        );

      case 'certificates':
        return (
          <Box key={section.id} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              Сертификаты
            </Typography>
            
            <Paper elevation={0} sx={{ 
              p: 2,
              mb: 2,
              bgcolor: 'background.paper',
              borderLeft: '2px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                {section.data.name}
              </Typography>
              
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                flexWrap: 'wrap',
                gap: 1
              }}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {section.data.issuer}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  fontStyle: 'italic'
                }}>
                  {section.data.date}
                </Typography>
              </Box>
              
              {section.data.description && (
                <Typography variant="body2" sx={{ 
                  mt: 1,
                  whiteSpace: 'pre-line'
                }}>
                  {section.data.description}
                </Typography>
              )}
            </Paper>
          </Box>
        );

      case 'about':
        return (
          <Box key={section.id} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 2,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              О себе
            </Typography>
            
            <Typography variant="body2" sx={{ 
              whiteSpace: 'pre-line',
              lineHeight: 1.6
            }}>
              {section.data.text}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box id="preview-content" sx={{ 
      bgcolor: 'background.paper',
      p: 3,
      borderRadius: 1,
      boxShadow: 'none',
      maxWidth: 800,
      mx: 'auto'
    }}>
      {sections.length > 0 ? (
        sections.map(renderSection)
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Добавьте секции, чтобы увидеть превью резюме
        </Typography>
      )}
    </Box>
  );
}