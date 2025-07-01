// components/DraggableList.js
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import EditorSection from './EditorSection';
import PersonalInfoEditor from './PersonalInfoEditor';
import { SortableItem } from './SortableItem';

export default function DraggableList({ sections, onReorder, onUpdate, onDelete, onAIFill }) {
  const [activeId, setActiveId] = useState(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: (event, args) => {
        // Custom keyboard coordinate getter if needed
        return args.currentCoordinates;
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex(item => item.id === active.id);
      const newIndex = sections.findIndex(item => item.id === over?.id);
      onReorder(arrayMove(sections, oldIndex, newIndex));
    }
    
    setActiveId(null);
  };

  const activeSection = activeId ? sections.find(section => section.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map(s => ({ id: s.id }))}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sections.map((section) => (
            <SortableItem 
              key={section.id} 
              id={section.id}
              disabled={section.type === 'personal'}
            >
              {section.type === 'personal' ? (
                <PersonalInfoEditor
                  section={section}
                  onUpdate={onUpdate}
                />
              ) : (
                <EditorSection
                  section={section}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onAIFill={onAIFill}
                />
              )}
            </SortableItem>
          ))}
        </Box>
      </SortableContext>
      
      <DragOverlay>
        {activeSection ? (
          <Box sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 3,
            width: '100%',
            opacity: 0.9
          }}>
            {activeSection.type === 'personal' ? (
              <PersonalInfoEditor
                section={activeSection}
                onUpdate={onUpdate}
              />
            ) : (
              <EditorSection
                section={activeSection}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAIFill={onAIFill}
              />
            )}
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}