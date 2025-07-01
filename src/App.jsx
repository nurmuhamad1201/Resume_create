import React, { useState, useEffect } from 'react';
import DraggableList from './components/DraggableList';
import ResumePreview from './components/ResumePreview';
 
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Add, Close, PictureAsPdf } from '@mui/icons-material';
import { getDefaultData, personalInfoTemplate, sectionTypes } from './components/constants';

function App() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resume');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const personal = parsed.find(s => s.type === 'personal') || personalInfoTemplate;
          const others = parsed.filter(s => s.type !== 'personal');
          setSections([personal, ...others]);
        } catch (e) {
          console.error("Failed to parse saved data, clearing localStorage", e);
          localStorage.removeItem('resume');
          setSections([personalInfoTemplate]);
        }
      } else {
        setSections([personalInfoTemplate]);
      }
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage when sections change (after initial load)
  useEffect(() => {
    if (sections.length > 0 && !isLoading) {
      localStorage.setItem('resume', JSON.stringify(sections));
    }
  }, [sections, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const addSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type,
      data: getDefaultData(type),
    };
    setSections([...sections, newSection]);
    setSelectedSection(type);
    setShowModal(false);
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map((s) =>
      s.id === id ? { ...s, data: { ...s.data, [field]: value } } : s
    ));
  };

  const deleteSection = (id) => {
    if (id === 'personal') return;
    setSections(sections.filter((s) => s.id !== id));
  };

  const reorderSections = (newOrder) => {
    const personal = newOrder.find(s => s.type === 'personal');
    const others = newOrder.filter(s => s.type !== 'personal');
    setSections([personal, ...others]);
  };

 const fillWithAI = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    let updatedData = {...section.data};
    
    switch(section.type) {
      case 'experience':
        updatedData = {
          position: 'Senior Frontend Developer',
          company: 'Tech Innovations Inc.',
          period: '2020 - Present',
          description: 'Разрабатывал адаптивные веб-приложения с использованием React, Redux и TypeScript.'
        };
        break;
      case 'education':
        updatedData = {
          institution: 'МГУ им. М.В. Ломоносова',
          specialty: 'Бакалавр информатики',
          period: '2018 - 2022',
          additionalInfo: 'Изученные предметы: Алгоритмы, Структуры данных, Веб-разработка, Искусственный интеллект'
        };
        break;
      case 'skills':
        updatedData = {
          skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Redux', 'Node.js']
        };
        break;
      case 'certificates':
        updatedData = {
          name: 'Advanced React',
          issuer: 'React Training',
          date: '2021',
          description: 'Продвинутые концепции React, включая хуки и Context API'
        };
        break;
      case 'about':
        updatedData = {
          text: 'Опытный фронтенд разработчик с 5+ годами опыта в создании современных веб-приложений. Специализируюсь на React экосистеме. Умею работать в команде и быстро осваиваю новые технологии.'
        };
        break;
      default:
        return;
    }
    
    // Update the specific section with AI-generated data
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, data: updatedData } : s
    ));
  };
  const downloadPDF = () => {
    import('jspdf').then(({ jsPDF }) => {
      import('html2canvas').then((html2canvas) => {
        const element = document.getElementById('preview-content');
        html2canvas.default(element).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('resume.pdf');
        });
      });
    });
  };

  return (
    <Box sx={{ 
  display: 'flex', 
  height: '100vh', 
  bgcolor: 'background.default',
  flexDirection: { xs: 'column', md: 'row' }
}}>
  {/* Editor Panel */}
  <Box sx={{ 
    width: { xs: '100%', md: '45%' }, 
    p: 3, 
    overflowY: 'auto',
    borderRight: { md: '1px solid' },
    borderColor: { md: 'divider' },
    bgcolor: 'background.paper',
    boxShadow: { md: 2 },
    zIndex: 1
  }}>
    <Box sx={{ 
      mb: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography variant="h4" component="h1" sx={{ 
        fontWeight: 'bold',
        color: 'primary.main'
      }}>
        Редактор резюме
      </Typography>
      
      <Button
        onClick={() => setShowModal(true)}
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<Add />}
        sx={{ 
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem'
        }}
      >
        Добавить секцию
      </Button>
    </Box>

    {selectedSection && (
      <Paper elevation={0} sx={{ 
        mb: 3, 
        p: 2,
        borderRadius: 2,
        bgcolor: `${sectionTypes[selectedSection].color}.light`,
        color: `${sectionTypes[selectedSection].color}.dark`,
        borderLeft: `4px solid`,
        borderColor: `${sectionTypes[selectedSection].color}.main`
      }}>
        <Typography variant="subtitle1">
          Вы выбрали: <strong>{sectionTypes[selectedSection].title}</strong>
        </Typography>
      </Paper>
    )}

    <DraggableList
      sections={sections}
      onReorder={reorderSections}
      onUpdate={updateSection}
      onDelete={deleteSection}
      onAIFill={fillWithAI}
      isDragging={isDragging}
      setIsDragging={setIsDragging}
    />

    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'primary.contrastText'
      }}>
        <Typography variant="h6">Выберите тип секции</Typography>
        <IconButton 
          onClick={() => setShowModal(false)}
          sx={{ color: 'primary.contrastText' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.entries(sectionTypes).map(([key, val]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Button
                fullWidth
                onClick={() => addSection(key)}
                variant="contained"
                color={val.color}
                sx={{ 
                  height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  py: 3,
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <val.icon size={32} />
                <Typography variant="body1">{val.title}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={() => setShowModal(false)} 
          variant="outlined"
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  </Box>

  {/* Preview Panel */}
  <Box sx={{ 
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    width: '55%', 
    p: 0,
    overflow: 'hidden',
    bgcolor: 'background.default',
    position: 'relative'
  }}>
    <Box sx={{ 
      position: 'sticky',
      top: 0,
      bgcolor: 'background.paper',
      zIndex: 1,
      p: 3,
      boxShadow: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Typography variant="h4" component="h2" sx={{ 
        fontWeight: 'bold',
        color: 'success.main'
      }}>
        Превью резюме
      </Typography>
      <Button
        onClick={downloadPDF}
        variant="contained"
        color="success"
        startIcon={<PictureAsPdf />}
        sx={{ 
          borderRadius: 2,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 1
          }
        }}
      >
        Скачать PDF
      </Button>
    </Box>
    
    <Box sx={{ 
      overflowY: 'auto',
      height: '100%',
      p: 3
    }}>
      <ResumePreview sections={sections} />
    </Box>
  </Box>
</Box>
  );
}

export default App;
 