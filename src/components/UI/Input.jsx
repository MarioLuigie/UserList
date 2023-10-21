/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from "prop-types";

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  width: 60%;
  min-width: 300px;
  max-width: 600px;

  .input {
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 1rem;
    box-shadow: #0000002f 0 0 25px;
    width: 100%;

    &::placeholder {
      color: #bebebe;
      font-size: 1rem;
    }

    &:focus::placeholder {
      visibility: hidden;
    }
  }

  .label {
    font-size: 1rem;
    color: #585858;
  }
`

export default function Input({
  id,
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}) {

  return (
    <div css={styles}>
      <label htmlFor={id} className='label'>{label}</label>
      <input 
        id={id}
        name={name}
        type={type} 
        value={value}
        onChange={onChange}
        className='input'
        placeholder={placeholder}
      />
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string ,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}