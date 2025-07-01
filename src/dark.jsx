import React from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = React.useState(null);

   
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let shouldEnableDark;

    if (savedTheme === 'dark') {
      shouldEnableDark = true;
    } else if (savedTheme === 'light') {
      shouldEnableDark = false;
    } else {
      shouldEnableDark = prefersDark;
    }

    setIsDark(shouldEnableDark);
    applyTheme(shouldEnableDark);
  }, []);

  
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

   
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    applyTheme(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  

  return React.createElement(
    'div',
    { className: 'flex flex-col items-center p-4' },
    React.createElement('h2', { className: 'text-lg font-semibold mb-3' }, 'Тема'),
    React.createElement(
      'div',
      { className: 'flex items-center gap-4' },
      React.createElement(
        'button',
        {
          onClick: toggleDarkMode,
          className:
            'px-4 py-2 rounded-md transition-colors ' +
            (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'),
        },
        isDark ? 'Темная тема' : 'Светлая тема'
      ),
     
    )
  );
};

export default DarkModeToggle;