import React, { Component } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import NewPaletteDrawer from './NewPaletteDrawer';
import NewPaletteAppBar from './NewPaletteAppBar';
import DraggableColorList from './DraggableColorList';
import EmojiPopup from './EmojiPopup';

import './NewPaletteForm.css';

const initialState = {
    open: true,
    colors: [
        { name: 'lilac', color: '#E24F95' },
        { name: 'powder blue', color: '#1CB6E4' },
        { name: 'sap green', color: '#47B61E' },
        { name: 'pine', color: '#0A8374' },
        { name: 'cool green', color: '#72CC99' },
        { name: 'desert sun', color: '#E47444' },
    ],
    clearing: false,
    paletteName: null,
    openEmojiPicker: false,
    emoji: null
}

export default class NewPaletteForm extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.addColor = this.addColor.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleDrawer() {
        this.setState({ open: !this.state.open })
    }

    addColor(c) {
        let newColors = [];
        const newColor = { name: c[0], color: c[1] };
        newColors.push(...this.state.colors, newColor);
        this.setState({ colors: newColors })
    }

    deleteColor(name) {
        this.setState({ colors: this.state.colors.filter(color => color.name !== name) })
    }

    handleSubmit() {
        const { paletteName, emoji, colors } = this.state;
        const id = paletteName.replaceAll(' ', '-').toLowerCase();
        const newPalette = {
            paletteName,
            id,
            emoji,
            colors
        }
        let newPaletteList = [...this.props.paletteList, newPalette];
        this.props.updatePaletteList(newPaletteList)
        this.setState(initialState)
        return this.props.navigate('/')
    }

    render() {
        const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
            ({ theme, open }) => ({
                flexGrow: 1,
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                height: 'calc(100vh - 75px)',
                marginTop: '75px',
                overflow: 'hidden',
                marginLeft: `-${this.props.drawerWidth}px`,
                ...(open && {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                }),
            }),
        );

        const { open, colors } = this.state;

        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NewPaletteAppBar
                    open={open}
                    toggleDrawer={this.toggleDrawer}
                    drawerWidth={this.props.drawerWidth}
                    colors={colors}
                    paletteList={this.props.paletteList}
                    clearPalette={() => this.setState({ colors: [], clearing: false })}
                    setClearing={() => this.setState({ clearing: !this.state.clearing })}
                    clearing={this.state.clearing}
                    savePaletteName={(n) => this.setState({ paletteName: n, openEmojiPicker: true })}
                    navigate={this.props.navigate}
                />
                <EmojiPopup
                    open={this.state.openEmojiPicker}
                    handleClose={() => this.setState({ openEmojiPicker: false })}
                    onEmojiClick={(evt, { emoji }) => this.setState({ emoji })}
                    emoji={this.state.emoji}
                    handleSubmit={this.handleSubmit}
                />
                <NewPaletteDrawer
                    open={open}
                    toggleDrawer={this.toggleDrawer}
                    drawerWidth={this.props.drawerWidth}
                    addColor={(newColor) => this.addColor(newColor)}
                    colors={colors}
                />
                <Main open={open} >
                    <DraggableColorList
                        colors={colors}
                        deleteColor={n => this.deleteColor(n)}
                        setColors={arr => this.setState({ colors: arr })}
                    />
                </Main>
            </Box >
        );
    }
}
