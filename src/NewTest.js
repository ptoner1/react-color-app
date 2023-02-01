import React, { Component } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';

import { ChromePicker } from 'react-color';
import chroma from 'chroma-js';

import './NewPaletteForm.css';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

class NewPaletteDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.randColor(),
            name: ''
        }
        this.setColor = this.setColor.bind(this);
        this.setColorName = this.setColorName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    randColor() {
        return ({
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256),
            a: 1
        }
        )
    }
    //     ValidatorForm.addValidationRule('isDuplicatedColor', color => {
    //     console.log(color)
    // let foundC = props.colors.find(c => c === color);
    // if (foundC) {
    //     console.log(true)
    //     return true
    // }
    // console.log(false)
    // return false
    //     })

    setColor(evt) {
        this.setState({ color: evt })
    }

    setColorName(evt) {
        this.setState({ name: evt })
    }

    handleSubmit() {
        console.log('handleSubmit fired')
        this.props.addColor(...this.state)
    }

    render() {
        const { color, name } = this.state;

        const cssColor = `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`;

        const isLight =
            chroma(cssColor).luminance() >= 0.6
            || chroma(cssColor).luminance() >= 0.5 && color.a < 0.4
            || chroma(cssColor).luminance() >= 0.35 && color.a < 0.3
            || color.a < 0.2;

        return (
            <Drawer
                sx={{
                    width: this.props.drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: this.props.drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={this.props.open}
            >
                <DrawerHeader>
                    <IconButton onClick={this.props.toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <Typography variant='h4'>Design Your Palette</Typography>
                <div>
                    <Button variant='contained' color='secondary'>Clear Palette</Button>
                    <Button variant='contained' onClick={() => this.setColor(this.randColor())}>Random Color</Button>
                </div>

                <ChromePicker
                    color={this.state.color}
                    onChange={c => this.setColor(c.rgb)}
                    onChangeComplete={c => this.setColor(c.rgb)}
                />

                <ValidatorForm
                    onSubmit={() => this.props.addColor([this.state.name, cssColor])}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Color Name"
                        onChange={n => this.setColorName(n.target.value)}
                        name="colorName"
                        value={this.state.name}
                        validators={['required']}
                        errorMessages={['Color must have a name']}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        style={{ backgroundColor: cssColor }}
                    >
                        <span className={`${isLight && 'light-color'}`}>
                            Add Color to Palette
                        </span>
                    </Button>
                </ValidatorForm>
                <Divider />
            </Drawer>
        );
    }
}

export default NewPaletteDrawer