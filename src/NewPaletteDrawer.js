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
            name: '',
            prevColor: []
        }
        this.setColor = this.setColor.bind(this);
        this.setColorName = this.setColorName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    randColor() {
        return (
            [
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                1
            ]
        )
    }

    slideColor(prevColor) {
        function rand80() { return Math.floor(Math.random() * 60 + 20) }
        function genAlpha() {
            const aChange = Math.random() / 10;
            if (prevColor[3] > 0.8) return prevColor[3] - aChange;
            if (prevColor[3] < 0.2) return prevColor[3] + aChange;
            return Math.random() > 0.5 ? prevColor[3] + aChange : prevColor[3] - aChange
        }
        const newColor = prevColor.map(num => {
            if (num > 245) return num - rand80()
            if (num < 10) return num + rand80()
            return Math.random() > 0.5 ? num + rand80() : num - rand80()
        });
        newColor.splice(3, 1, genAlpha())

        return newColor
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isDuplicatedColor', (value) => {
            let colorFound = this.props.colors.find(c => c.color === `rgba(${this.state.color})`);
            return colorFound ? false : true
        })
        ValidatorForm.addValidationRule('isDuplicatedName', name => {
            let nameFound = this.props.colors.find(c => c.name.toLowerCase() === name.toLowerCase());
            if (nameFound) {
                return false
            }
            return true
        })
        ValidatorForm.addValidationRule('prevColor', value => {
            return this.state.prevColor
        })
    }

    setColor(evt) {
        if (evt.r) { return this.setState({ color: [evt.r, evt.g, evt.b, evt.a] }) }
        if (evt.length === 4) return this.setState({ color: evt })
    }

    setColorName(evt) {
        this.setState({ name: evt })
    }

    handleSubmit(cssColor) {
        this.props.addColor([this.state.name, cssColor])
        const prevColor = new Array(...this.state.color)
        this.setState({ name: '', color: this.slideColor(prevColor), prevColor })
    }

    render() {
        const { color, prevColor, name } = this.state;

        const cssColor = `rgba(${color})`;
        const cssPrevColor = `rgba(${prevColor})`;

        const chromePickerColor = { r: color[0], g: color[1], b: color[2], a: color[3] };

        function isLight(c) {
            return chroma(c).luminance() >= 0.6
                || chroma(c).luminance() >= 0.5 && color.a < 0.4
                || chroma(c).luminance() >= 0.35 && color.a < 0.3
                || color.a < 0.2;
        }

        return (
            <Drawer
                sx={{
                    width: this.props.drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: this.props.drawerWidth,
                        boxSizing: 'border-box',
                    },
                    transition: 'width 0.5s'
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
                    {this.state.prevColor
                        ? <Button variant='contained' onClick={() => this.setColor(this.state.prevColor)} style={{ backgroundColor: cssPrevColor }}>Previous Color</Button>
                        : <Button disabled variant='contained'>Previous Color</Button>
                    }
                    <Button variant='contained' onClick={() => this.setColor(this.randColor())}>Random Color</Button>
                </div>

                <ChromePicker
                    color={chromePickerColor}
                    onChange={c => this.setColor(c.rgb)}
                    onChangeComplete={c => this.setColor(c.rgb)}
                />

                <ValidatorForm
                    onSubmit={() => this.handleSubmit(cssColor)}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Color Name"
                        onChange={n => this.setColorName(n.target.value)}
                        name="colorName"
                        value={this.state.name}
                        validators={['required', 'isDuplicatedName', 'isDuplicatedColor']}
                        errorMessages={['Color must have a name', 'Another color is using that name', 'Color is already in Palette']}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        style={{ backgroundColor: cssColor }}
                    >
                        <span className={`${isLight(cssColor) && 'light-color'} `}>
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