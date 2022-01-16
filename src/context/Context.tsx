import React from 'react';
import pathDict from '../app/pathDict';

export const contextInitialState: { activeMenuItem: pathDict; setActiveMenuItem: () => void } = {
  activeMenuItem: pathDict.transactions,
};

const AppContext = React.createContext(contextInitialState);
AppContext.displayName = 'AppContext';

export default AppContext;
