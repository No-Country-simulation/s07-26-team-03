import React from "react";

interface MetricConnectorSvgProps {
  color: string;
  idSuffix: string;
  alignmentClass?: string; 
}

export const MetricConnectorSvg: React.FC<MetricConnectorSvgProps> = ({
  color,
  idSuffix,
  alignmentClass = "",
}) => {
  const gradientId = `card_connector_grad_${idSuffix}`;

  return (
    <div className={`metric-connector-wrapper ${alignmentClass}`}>
      <svg
        viewBox="0 0 25 248"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block shrink-0 overflow-visible"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C0 0 1.5625 14.2 10.525 27.3C19.4875 40.4 25 42.8 25 42.8V220C25 220 17.8672 223.8 10.525 231.0C3.18278 238.2 0 248 0 248V0Z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="124"
            x2="25"
            y2="124"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} />
            <stop offset="1" stopColor={color} />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="20"
        height="96"
        viewBox="0 0 20 96"
        fill="none"
        className="metric-connector-arrow"
      >
        <path
          d="M10 0V90M10 90L2 78M10 90L18 78"
          stroke="#E5E7EB"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const LockIconSvg: React.FC<{ hexColor: string; textColor: string }> = ({
  hexColor,
  textColor,
}) => {
  return (
    <svg
      width="40"
      height="46"
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <g filter="url(#filter0_i_243_3965)">
        <rect width="40" height="46" rx="20" fill={hexColor} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.6893 18.9393C10.9706 18.658 11.3522 18.5 11.75 18.5H28.25C28.6478 18.5 29.0294 18.658 29.3107 18.9393C29.592 19.2206 29.75 19.6022 29.75 20V30.1836C29.75 32.0371 28.1846 33.5 26.375 33.5H13.625C11.7933 33.5 10.25 31.9567 10.25 30.125V20C10.25 19.6022 10.408 19.2206 10.6893 18.9393ZM28.25 20L11.75 20L11.75 30.125C11.75 31.1283 12.6217 32 13.625 32H26.375C27.4004 32 28.25 31.1651 28.25 30.1836V20Z"
          className={textColor}
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 14C19.0054 14 18.0516 14.3951 17.3483 15.0983C16.6451 15.8016 16.25 16.7554 16.25 17.75V19.25C16.25 19.6642 15.9142 20 15.5 20C15.0858 20 14.75 19.6642 14.75 19.25V17.75C14.75 16.3576 15.3031 15.0223 16.2877 14.0377C17.2723 13.0531 18.6076 12.5 20 12.5C21.3924 12.5 22.7277 13.0531 23.7123 14.0377C24.6969 15.0223 25.25 16.3576 25.25 17.75V19.25C25.25 19.6642 24.9142 20 24.5 20C24.0858 20 23.75 19.6642 23.75 19.25V17.75C23.75 16.7554 23.3549 15.8016 22.6517 15.0983C21.9484 14.3951 20.9946 14 20 14Z"
          className={textColor}
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_243_3965"
          x="0"
          y="-1.17"
          width="40"
          height="47.17"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1.17" />
          <feGaussianBlur stdDeviation="0.585" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.054902 0 0 0 0 0.415686 0 0 0 0 0.215686 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_243_3965"
          />
        </filter>
      </defs>
    </svg>
  );
};