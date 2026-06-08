export const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
export const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
export const truncate = (text, max = 100) => text.length > max ? text.slice(0, max) + '...' : text;
