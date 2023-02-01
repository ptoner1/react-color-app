import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Picker from 'emoji-picker-react';


export default function EmojiPopup(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                    {"Pick an Emoji"}
                </DialogTitle>
                <DialogContent>
                    <Picker onEmojiClick={props.onEmojiClick} />
                    <div style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '10px' }}>
                        {props.emoji ? (
                            <span>You chose: {props.emoji.emoji}</span>
                        ) : (
                            <span>No emoji Chosen</span>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={props.handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={props.emoji ? 'contained' : 'none'}
                        color={props.emoji ? 'success' : 'primary'}
                        onClick={props.handleSubmit}
                        autoFocus
                    >
                        Save Palette
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}