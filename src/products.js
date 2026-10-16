export const categories = [
  { name: 'Clothing', detail: 'Your next favorite outfit', art: 'shirt', color: '#eee4da' },
  { name: 'Cosmetics', detail: 'A moment just for you', art: 'bottle', color: '#f3dfe2' },
  { name: 'Furniture', detail: 'Make yourself at home', art: 'chair', color: '#e4e7db' },
  { name: 'Electronics', detail: 'Upgrade your everyday', art: 'headphones', color: '#e1e6eb' },
  { name: 'Housewares', detail: 'Little things, lovely living', art: 'vase', color: '#eee2d3' },
  { name: 'Appliances', detail: 'Good mornings start here', art: 'coffee', color: '#e7e3dc' },
];

export const products = [
  { id: 'shirt', name: 'Sunday cotton overshirt', category: 'Clothing', price: 48, label: 'Everyday essential', art: 'shirt', color: '#eee4da' },
  { id: 'serum', name: 'Dewdrop botanical serum', category: 'Cosmetics', price: 24, label: 'A little self-care', art: 'bottle', color: '#f3dfe2' },
  { id: 'chair', name: 'Solstice lounge chair', category: 'Furniture', price: 240, label: 'Made for slow living', art: 'chair', color: '#e4e7db' },
  { id: 'headphones', name: 'Cloud wireless headphones', category: 'Electronics', price: 89, label: 'Find your quiet', art: 'headphones', color: '#e1e6eb' },
  { id: 'vase', name: 'Terra ceramic vase', category: 'Housewares', price: 32, label: 'The finishing touch', art: 'vase', color: '#eee2d3' },
  { id: 'coffee', name: 'Daybreak coffee maker', category: 'Appliances', price: 75, label: 'Your morning ritual', art: 'coffee', color: '#e7e3dc' },
];

export const money = (amount) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
}).format(amount);
