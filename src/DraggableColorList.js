import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable';

import DraggableColorBox from './DraggableColorBox';

export default function DraggableColorList(props) {
    const { colors, setColors } = props;
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const cols = colors.map(c => c.color)

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={cols}>
                {colors.map(color => <DraggableColorBox key={color.color} id={color.color} name={color.name} color={color.color} delete={() => props.deleteColor(color.name)} />)}
            </SortableContext>
        </DndContext>
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = cols.indexOf(active.id);
            const newIndex = cols.indexOf(over.id);
            const newColors = arrayMove(cols, oldIndex, newIndex);
            const hey = newColors.map(color => {
                return colors.find(c => c.color === color);
            })
            setColors(hey)
        }
    }
}