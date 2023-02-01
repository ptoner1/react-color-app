import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class NewPaletteAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paletteName: ''
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('duplicatedName', (name) => {
            let nameFound = this.props.paletteList.find(c => c.paletteName.toLowerCase() === name.toLowerCase())
            if (nameFound) {
                return false
            }
            return true
        })
        ValidatorForm.addValidationRule('isDuplicatedName', name => {
            console.log('validating')
            let nameFound = this.props.colors.find(c => c.name.toLowerCase() === name.toLowerCase());
            if (nameFound) {
                return false
            }
            return true
        })
    }

    render() {
        const { open, drawerWidth, toggleDrawer } = this.props;

        const clearPaletteButton =
            this.props.clearing
                ? (
                    <div>
                        <Button style={{ height: '55px' }} variant='contained' color='error' onClick={this.props.clearPalette} >You Sure?</Button>
                        <Button style={{ height: '55px' }} variant='contained' color='warning' onClick={this.props.setClearing} >No</Button>
                    </div>
                )
                : <Button style={{ width: '181px', height: '55px' }} disabled={!this.props.colors.length} variant='contained' color='warning' onClick={this.props.setClearing}>Clear Palette</Button>


        return (
            <AppBar
                color='default'
                position="fixed"
                // open={open}
                sx={{ transition: 'width 0.2s', padding: '5px 0', ...(open && { width: `calc(100% - ${drawerWidth}px)` }) }}
            >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexgrow: 1 }}>
                        Create New Palette
                    </Typography>

                    <ValidatorForm
                        onSubmit={() => this.props.savePaletteName(this.state.paletteName)}
                        onError={errors => console.log(errors)}
                        style={{ display: 'flex' }}
                    >
                        <TextValidator
                            label='Palette Name'
                            onChange={n => this.setState({ paletteName: n.target.value })}
                            name='paletteName'
                            value={this.state.paletteName}
                            autoFocus
                            validators={['required', 'duplicatedName']}
                            errorMessages={['Palette Must Have a Name', 'Palette name must be unique']}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='success'
                        >
                            Save Palette
                        </Button>
                    </ValidatorForm>
                    <span style={{ float: 'right', display: 'flex', justifyContent: 'space-between' }}>
                        {clearPaletteButton}
                        <Link to='/' style={{ margin: '0 20px' }}><Button style={{ height: '55px' }} variant='contained'>Go Back</Button></Link>
                    </span>
                </Toolbar>
            </AppBar>
        );
    }
}