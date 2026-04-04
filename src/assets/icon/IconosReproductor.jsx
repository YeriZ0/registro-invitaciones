// Icono Play (Basado en tu PlayerPlayFill)
export const IconoPlay = ({ size = "24px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fill={color} 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M19.5 14.598c2-1.155 2-4.041 0-5.196l-9-5.196C8.5 3.05 6 4.494 6 6.804v10.392c0 2.31 2.5 3.753 4.5 2.598z" 
    />
  </svg>
);

// Icono Pausa (Basado en tu PauseSolid)
export const IconoPausa = ({ size = "24px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fill={color} 
      d="M8 5.75A1.75 1.75 0 0 0 6.25 7.5v10c0 .966.784 1.75 1.75 1.75h1a1.75 1.75 0 0 0 1.75-1.75v-10A1.75 1.75 0 0 0 9 5.75zm6.5 0a1.75 1.75 0 0 0-1.75 1.75v10c0 .966.784 1.75 1.75 1.75h1a1.75 1.75 0 0 0 1.75-1.75v-10a1.75 1.75 0 0 0-1.75-1.75z" 
    />
  </svg>
);

// Icono Volumen Máximo (Basado en tu VolumeFill - 16x16)
export const IconoVolumenMax = ({ size = "16px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fill={color} 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M1.5 11h3l2.586 2.586a1.414 1.414 0 0 0 2.414-1V3.414a1.414 1.414 0 0 0-2.414-1L4.5 5h-3A1.5 1.5 0 0 0 0 6.5v3A1.5 1.5 0 0 0 1.5 11m12.662 2.103c-.265.319-.743.317-1.036.024c-.292-.293-.288-.766-.031-1.09A6.47 6.47 0 0 0 14.5 8a6.47 6.47 0 0 0-1.405-4.036c-.257-.325-.261-.797.032-1.09c.292-.293.77-.295 1.035.024A7.97 7.97 0 0 1 16 8c0 1.94-.69 3.718-1.838 5.103m-2.138-2.135c-.246.333-.726.33-1.019.037c-.293-.292-.284-.764-.06-1.112A3.5 3.5 0 0 0 11.5 8c0-.697-.204-1.346-.555-1.892c-.224-.348-.233-.82.06-1.113s.773-.296 1.02.038C12.638 5.863 13 6.889 13 8a4.98 4.98 0 0 1-.976 2.968" 
    />
  </svg>
);

// Icono Altavoz (Basado en tu VolumeFilled - 24x24)
export const IconoAltavoz = ({ size = "24px", color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fill={color} 
      d="M4 17h2.7l5.75 3.83c.17.11.36.17.55.17c.16 0 .32-.04.47-.12c.33-.17.53-.51.53-.88V4c0-.37-.2-.71-.53-.88s-.72-.15-1.03.05L6.69 7h-2.7c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2Z" 
    />
  </svg>
);