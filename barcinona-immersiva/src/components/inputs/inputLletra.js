import { forwardRef } from "react";
import styles from "../../estils/InputLletra.module.css";

/**
 * Casella de lletra individual
 */
const InputLletra = forwardRef(
  ({ value, onChange, onBackspace, onNext, index, correct, selected }, ref) => {
    // Gestió de teclat
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        if (value === "") onBackspace(index - 1);
        else onChange(index, "");
      } else if (e.key === "ArrowLeft") {
        onBackspace(index - 1);
      } else if (e.key === "ArrowRight") {
        onNext(index + 1);
      }
    };

    // Canvi de valor
    const handleChange = (e) => {
      const char = e.target.value.toUpperCase();
      if (/^[A-ZÀ-ÿ0-9]$/.test(char)) {

        onChange(index, char[0]);
        onNext(index + 1);
      } else {
        onChange(index, "");
      }
    };

    // Classes dinàmiques segons l'estat
    const classes = [styles.input];
    if (correct === true) classes.push(styles.correct);
    else if (correct === false) classes.push(styles.incorrect);
    if (selected) classes.push(styles.selected);

    return (
      <input
        ref={ref}
        type="text"
        maxLength={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={classes.join(" ")}
      />
    );
  }
);

export default InputLletra;
