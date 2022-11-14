import { css } from "@emotion/react";

export const glassCardStyle = css`
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
`;

export const glassDividerStyle = css`
  border-bottom: 1px solid rgba(158, 162, 167, 0.3);
`;

export const glassInputStyle = css`
  border: none;
  background: rgba(164, 164, 164, 0.23);
  border-radius: 15px;
  transition: background-color 0.3s;
  padding: 10px 15px;

  &:focus,
  &:hover {
    background: rgba(109, 109, 109, 0.23);
  }
`;

export const glassButtonStyle = css`
  border: none;
  background: rgba(164, 164, 164, 0.23);
  border-radius: 15px;
  transition: background-color 0.3s;
  padding: 10px 15px;
  cursor: pointer;

  &:focus,
  &:hover {
    background: rgba(109, 109, 109, 0.23);
  }
`;

export const primaryGlassButtonColorStyle = css`
  background-color: rgba(115, 85, 150, 0.8);
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(115, 85, 150, 0.95);
  }
`;
