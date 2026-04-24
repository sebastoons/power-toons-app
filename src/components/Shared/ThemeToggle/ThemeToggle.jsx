import React, { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      className={styles.btn}
      onClick={() => setDark(d => !d)}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      {dark ? '◑' : '◐'}
    </button>
  );
};

export default ThemeToggle;
