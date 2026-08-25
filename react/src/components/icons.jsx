import React from 'react'

const svg = (path, extra) => function Icon({ size = 22, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
      {extra}
    </svg>
  )
}

export const IcoClose = svg(<path d="M18 6L6 18M6 6l12 12" />)
export const IcoBack = svg(<path d="M15 18l-6-6 6-6" />)
export const IcoForward = svg(<><path d="M10 9V5l7 7-7 7v-4.1c-4 0-6.6 1.3-8 4.1.4-4.6 2.6-9 8-10z" /></>)
export const IcoCopy = svg(<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M6 15H5a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v1" /></>)
export const IcoSave = svg(<><path d="M12 3v12" /><path d="M7 11l5 5 5-5" /><path d="M4 20h16" /></>)
export const IcoTrash = svg(<><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" /></>)
export const IcoSelect = svg(<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12.5l2.6 2.6L16 9.5" /></>)
export const IcoReply = svg(<path d="M9 10V6l-6 6 6 6v-4h4a7 7 0 017 7c0-7.2-4.6-11-11-11z" />)
export const IcoPin = svg(<><path d="M12 17v5" /><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z" /></>)
export const IcoStar = svg(<path d="M12 3.6l2.6 5.3 5.9.9-4.2 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9L3.5 9.8l5.9-.9L12 3.6z" />)
export const IcoInfo = svg(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>)
export const IcoMic = svg(<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0" /><path d="M12 18v3" /></>)
export const IcoSearch = svg(<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>)
export const IcoSend = svg(<path d="M4 12l16-8-6 8 6 8-16-8z" />)
export const IcoPlus = svg(<path d="M12 5v14M5 12h14" />)
export const IcoCheck = svg(<path d="M4 12.5l5 5L20 6.5" />)
export const IcoPlay = svg(<path d="M8 5l11 7-11 7V5z" />)
export const IcoFile = svg(<><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5" /></>)
export const IcoImage = svg(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M21 16l-5-5-9 9" /></>)
export const IcoVideo = svg(<><rect x="3" y="6" width="12" height="12" rx="2" /><path d="M15 10.5l6-3.5v10l-6-3.5z" /></>)
export const IcoAlert = svg(<><path d="M12 4l9 16H3l9-16z" /><path d="M12 10v4M12 17h.01" /></>)
