# Audio Converter

## Introduction
An audio converting web application powered by **FFmpeg**.  


---

## Overview

### Backend
- A **.NET API** built using clean architecture
- Allows conversion of audio files between the supported formats using **FFmpeg**
- **Supported formats:** MP3, FLAC, AAC, OGG, WMA, WAV

### Frontend
- Built with **React + Vite**
- Lets the user select a file to convert and choose the desired output format from a dropdown menu
- Allows the user to change the background color, using an color picker. The color is saved locally so it won't change back to the default color when the site is reloaded
