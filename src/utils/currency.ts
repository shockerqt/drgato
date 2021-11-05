export const toClp = (number?: number) => (
  number
    ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number)
    : ''
);
