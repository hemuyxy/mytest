import React, { useState } from 'react';
import router from './router';
import { RouterProvider } from 'react-router-dom'
import { GlobalContext } from './api/content';
function App() {
  const [theme, setTheme] = useState("light"); //主题 默认日间模式
  const contextVal = { theme, setTheme }
  return (
    <div className="App">
      <GlobalContext.Provider value={contextVal}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
