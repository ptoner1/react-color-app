import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MiniPalette from './MiniPalette';
import './PaletteList.css';

export default function PaletteList(props) {


    const [open, toggleOpen] = React.useState(false);
    const [paletteId, selectPalette] = React.useState(null);

    const { palettes, updatePaletteList, navigate } = props;

    function handleDelete() {
        const newPaletteList = palettes.filter(p => p.id !== paletteId)
        updatePaletteList(newPaletteList)
        toggleOpen(false)
        // return navigate('/')
        return
    }

    return (
        <div className='root'>
            <div className='container'>
                <nav className='nav'>
                    <h1>React Colors</h1>
                    <Link to='/palette/new'><span>new palette</span></Link>
                </nav>
                <div className='palettes'>
                    {palettes.map(palette => (
                        <MiniPalette
                            toggleOpen={(id) => { toggleOpen(true); selectPalette(id) }}
                            key={palette.id}
                            {...palette}
                        />
                    ))}
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={() => toggleOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this color palette?"}
                    </DialogTitle>
                    <DialogContent style={{ textAlign: 'center' }}>
                        {paletteId}
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button variant='contained' color='error' onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                        <Button variant='contained' onClick={() => toggleOpen(false)}>No</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}