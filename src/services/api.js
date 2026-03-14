const MOCK_COMPONENTS = [
  { id: 1, name: 'Resistor' },
  { id: 2, name: 'Capacitor' },
  { id: 3, name: 'Diode' },
  { id: 4, name: 'Transistor' },
];

export const getComponents = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_COMPONENTS;
};
