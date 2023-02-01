import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './MiniPalette.css';
import { Link } from 'react-router-dom';


function MiniPalette(props) {
    const { colors, emoji, paletteName, id } = props;
    const miniColorBoxes = colors.map(color => (
        <div
            style={{ backgroundColor: color.color }}
            className='miniColor'
            key={color.name}
        />
    ))
    return (
        <div className='MiniPalette'>
            <DeleteIcon
                onClick={() => props.toggleOpen(id)}
                className='delete'
                style={{ transition: 'all 0.4s ease-in-out' }} />
            <Link to={`/palette/${id}`}>
                <div className='colors'>
                    {miniColorBoxes}
                </div>
                <h5 className='title'>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </h5>
            </Link>
        </div>
    )
}

export default MiniPalette;