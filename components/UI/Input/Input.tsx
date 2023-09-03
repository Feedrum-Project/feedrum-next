import Image from "next/image";
import PopUp from "../PopUp/PopUp";
import styles from "./styles/input.module.sass";
import eye from "images/eye.svg";
import question from "images/Question.svg";
import { useState } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  Name: string;
  name?: string;
  disabled?: boolean;
  autoComplete?: boolean;
  value?: string;
  info?: string;
  id?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  required?: boolean;
  minLength?: number;
  size?: number;
  borders?: boolean;
}
/**
 * Feedrums input.
 * @example
 * // Usage:
 * <Input type="text" name="user" id="user"/>
 */
export default function Input({
  type = "text",
  Name,
  name,
  placeholder,
  disabled = false,
  value = "",
  info,
  id,
  autoComplete,
  onChange,
  required = false,
  minLength,
  size = 16,
  borders = true
}: InputProps) {
  const [show, setShow] = useState<{
    show: boolean;
    coords: { x: number; y: number };
  }>({ show: false, coords: { x: 0, y: 0 } });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [valueInp, setValue] = useState<string>(value);

  return (
    <div
      className={[styles.inputSquare, borders ? styles.borders : null].join(
        " "
      )}
    >
      <div className={styles.inputSquareName}>
        <span>
          {Name}
          {required ? "*" : null}
        </span>
        <div
          className={styles.info}
          onMouseEnter={(e) => {
            setShow({
              show: true,
              coords: { x: e.pageX, y: e.pageY + 10 }
            });
          }}
          onMouseLeave={() => {
            setShow({ show: false, coords: { x: 0, y: 0 } });
          }}
        >
          {info ? <Image src={question} alt="Запитання." /> : null}
        </div>
      </div>
      <div className={styles.inputSquareBottom}>
        <input
          onChange={(e) => {
            setValue(e.target.value);
            onChange !== undefined ? onChange(e) : null;
          }}
          value={valueInp}
          disabled={disabled}
          type={showPassword !== true ? type : "text"}
          placeholder={placeholder}
          name={name}
          id={id}
          autoComplete={autoComplete ? "true" : "false"}
          className={styles.inputSquareInput}
          required={required}
          min={minLength}
          style={{ fontSize: size }}
        />
        {type === "password" ? (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <Image src={eye} alt="show password" />
          </button>
        ) : null}
      </div>
      {show.show && info !== undefined ? (
        <PopUp info={info} coords={show.coords} />
      ) : null}
    </div>
  );
}
