/**
 * slotUtils.js
 * -----------------
 * Helper functions for calculating food prep times
 */
exports.getPrepBuffer = (menuItems) => {
  let prepTime = 0;
  for (const item of menuItems) {
    prepTime += item.prepTime || 5; // default 5 mins per item
  }
  return prepTime;
};
