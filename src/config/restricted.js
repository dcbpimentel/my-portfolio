export const RESTRICTED = true

export const fireRestricted = () =>
  typeof window !== 'undefined' &&
  window.dispatchEvent(new CustomEvent('restricted-click'))
