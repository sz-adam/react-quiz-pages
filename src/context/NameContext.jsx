import React from 'react';

export const NameContextDefaults ={
    value: [],
    setValue: () => {}
}

    export const NameContext =React.createContext(NameContextDefaults);