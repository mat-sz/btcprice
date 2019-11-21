import React from 'react';

const ThemedStylesContext = React.createContext({});

export const ThemedStylesProvider = ThemedStylesContext.Provider;
export const ThemedStylesConsumer = ThemedStylesContext.Consumer;
export default ThemedStylesContext;