import React from 'react';

export default function Illustration({ type, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 240 220" fill="none" aria-hidden="true">
      <ellipse cx="120" cy="194" rx="76" ry="9" fill="#352c2714" />
      {type === 'shirt' && <g stroke="#736552" strokeWidth="2" strokeLinejoin="round">
        <path d="m84 44 24-10h24l24 10 34 36-24 23-14-17v99H88V86l-14 17-24-23z" fill="#c3b49a" />
        <path d="m108 34 12 22 12-22m-12 22v129M88 86l-4-42m68 42 4-42" />
        <path d="M98 85h15v22H98zm29 0h15v22h-15z" fill="#d4c7b0" />
        <path d="m103 36-7 20 15 10 9-10 9 10 15-10-7-20" fill="#d9cdb6" />
        <path d="M124 80h1m-1 39h1m-1 38h1" strokeWidth="3" strokeLinecap="round" />
      </g>}
      {type === 'bottle' && <g>
        <rect x="89" y="77" width="63" height="108" rx="12" fill="#a35b43" />
        <rect x="96" y="81" width="9" height="98" rx="4" fill="#d69b73" opacity=".6" />
        <rect x="100" y="55" width="40" height="26" rx="3" fill="#e6d2aa" />
        <path d="M110 55V37a10 10 0 0 1 20 0v18" fill="#4d3939" />
        <rect x="89" y="112" width="63" height="48" fill="#fff5e4" />
        <path d="M110 126h21m-26 8h31m-25 12h19" stroke="#9b6552" strokeWidth="2" />
        <path d="M159 76c15-17 27-14 27-14s2 18-27 26M73 108C48 99 46 81 46 81s26-6 27 27" fill="#a4aa86" />
      </g>}
      {type === 'chair' && <g stroke="#655946" strokeWidth="3" strokeLinejoin="round">
        <path d="m72 147-9 44m102-44 13 44" strokeWidth="7" />
        <path d="M73 122V71q0-25 25-25h45q25 0 25 25v51" fill="#a5a27c" />
        <rect x="68" y="112" width="106" height="43" rx="15" fill="#b4b18a" />
        <path d="M69 139V99q-14-20-25-4v39q0 22 25 22h105q23 0 23-22V95q-12-16-25 4v40" fill="#99976d" />
        <path d="M91 62v43m14-43v43m15-43v43m15-43v43m15-43v43" stroke="#c7c4a0" strokeWidth="2" />
      </g>}
      {type === 'headphones' && <g>
        <path d="M64 129V91a56 56 0 0 1 112 0v38" stroke="#3d444f" strokeWidth="20" />
        <path d="M64 95v-4a56 56 0 0 1 112 0v4" stroke="#8c959d" strokeWidth="9" />
        <rect x="48" y="105" width="39" height="65" rx="18" fill="#535e69" transform="rotate(-9 48 105)" />
        <rect x="154" y="105" width="39" height="65" rx="18" fill="#535e69" transform="rotate(9 154 105)" />
        <path d="m66 119 5 34m99-34-5 34" stroke="#88939d" strokeWidth="6" strokeLinecap="round" />
      </g>}
      {type === 'vase' && <g>
        <path d="M120 109q-13-56 19-91m-19 78Q88 53 76 43m43 34q30-37 57-31" stroke="#747e50" strokeWidth="3" />
        <path d="M135 36q-6-24 10-32 12 23-10 32M125 60q21-26 34-12-9 22-34 12M99 70Q65 72 66 49q25-7 33 21M149 52q13-31 35-22 1 23-35 22" fill="#969e6b" />
        <path d="M96 99h48v27q34 24 26 52-5 16-50 16t-50-16q-8-28 26-52z" fill="#bb785b" />
        <path d="M104 109v23q-26 25-23 43m33-66v75m12-75 3 75m7-75 2 24q22 24 21 42" stroke="#d59675" strokeWidth="3" />
      </g>}
      {type === 'coffee' && <g stroke="#56534b" strokeWidth="2">
        <path d="M69 47h91v135H69z" fill="#b0b4aa" />
        <path d="M81 72h67v88H81z" fill="#454e48" />
        <rect x="62" y="174" width="109" height="16" rx="4" fill="#626b62" />
        <path d="M63 43q0-9 9-9h81q13 0 13 13v27H63z" fill="#d2d3c7" />
        <circle cx="146" cy="54" r="6" fill="#8c9e7b" />
        <path d="M92 119h45v31q0 12-22 12t-23-12z" fill="#f9eddb" />
        <path d="M137 125h8q13 0 8 15-3 7-16 7" stroke="#f9eddb" strokeWidth="7" />
        <path d="M109 89v17m12-17v17" stroke="#be9678" strokeWidth="3" strokeLinecap="round" />
      </g>}
    </svg>
  );
}
