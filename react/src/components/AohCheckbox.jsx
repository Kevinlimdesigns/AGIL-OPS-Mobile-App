/**
 * AOH `checkbox` — component instance.
 *
 * Figma binding (do NOT hand-draw a box anywhere else in the app):
 *   library      AOH Master
 *   component    checkbox  (component_set)
 *   componentKey c607ac11ad6e33374404e476e67e9a6ceda7bbc7
 *
 * Checked / unchecked / disabled come from the component set's own variants —
 * this file is the single place they are expressed in code, and every selection
 * control in the app is an instance of it. Nothing here invents a new control.
 */
import React from 'react'

/** @param {{checked?: boolean, disabled?: boolean, size?: number}} props */
export default function AohCheckbox({
  checked = false,
  disabled = false,
  size = 20,
  label,
  onChange,
  tapTarget = 44,
}) {
  const variant = disabled ? 'Disabled' : checked ? 'Checked' : 'Unchecked'

  return (
    <span
      className="aoh-checkbox"
      data-component="AOH Master/checkbox"
      data-variant={`State=${variant}`}
      style={{ '--cb-size': `${size}px`, '--cb-tap': `${tapTarget}px` }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={label}
        onChange={onChange}
        /* Native input carries the a11y semantics; the box below is the
           component's own rendering of its variant. */
        tabIndex={-1}
        readOnly={!onChange}
      />
      <span className="aoh-checkbox__box" aria-hidden="true">
        {checked && !disabled && (
          <svg viewBox="0 0 16 16" width={size - 6} height={size - 6}>
            <path
              d="M3 8.5l3.2 3.2L13 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </span>
  )
}
