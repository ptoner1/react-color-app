import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './DraggableColorBox.css';

export default function DraggableColorBox(props) {
    const [disabled, disable] = React.useState(false)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id, disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: props.color
    };
    return (
        <div ref={setNodeRef} className='Root' style={style} {...attributes} {...listeners}>
            <div className='Box'>
                <span> {props.name}</span>
                <DeleteIcon
                    className='Delete'
                    fontSize='small'
                    onMouseEnter={() => disable(true)}
                    onMouseLeave={() => disable(false)}
                    onClick={() => props.delete()} />
            </div>
        </div>
    )
}