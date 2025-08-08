import { useState } from 'react';
import styles from '../styles/Input.css';

function Input({ id, label, type = "text", value, onChange, placeholder, error, required = false }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="input-wrapper">
      <label htmlFor={id} className="input-label">
        {label} {required && <span className={styles.labelRequired}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field" 
      />
      {error && <p className="input-error">{error}</p>}
    </div>
  );
}

export default Input;