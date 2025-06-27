import React, { useState, useRef } from 'react';
import 'aframe';
import placeHolder from "../assets/videos/CAP1_v1.mp4"
import { Entity, Scene } from 'aframe-react';


export default function Video360Player({ src }) {
    return (
        <Scene>
            <Entity primitive="a-videosphere" src="#video360" />
            <video
                id="video360"
                // src={provabonaVideo} 
                src={placeHolder}
                rotation="0 90 0"
                autoPlay
         //     play-on-click
                loop
                playsInline
                //muted
                crossOrigin="anonymous" />
        </Scene>
    );
}