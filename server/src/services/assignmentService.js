const cityAssignments = {
  chandigarh: 'Agent A',
  mohali: 'Agent B',
  panchkula: 'Agent C',
  'new chandigarh': 'Agent D',
  kharar: 'Agent B',
  kurali: 'Agent D',
  rajpura: 'Agent E',
};

export const assignLeadOwner = ({ city, preferredLocation, location }) => {
  const key = String(city || preferredLocation || location || '').trim().toLowerCase();
  return cityAssignments[key] || 'P4 Sales Team';
};

export default { assignLeadOwner };
