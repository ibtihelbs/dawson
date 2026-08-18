const modal = document.querySelector(".modal");
console.log(modal);
// Preload component HTML
const preloadComponent = async (file) => {
  try {
    const response = await fetch(file);
    if (!response.ok)
      throw new Error(`Failed to preload ${file}: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error(error);
    return ""; // Return empty string on error
  }
};

// Store preloaded components
const preloadedComponents = {};

// Preload header and footer
Promise.all([
  preloadComponent("./componants/modal.html").then(
    (html) => (preloadedComponents["header"] = html)
  ),
]);

// Insert preloaded components
const loadComponentFromCache = (selector, key) => {
  document.querySelector(selector).innerHTML =
    preloadedComponents[key] || "Failed to load component.";
};

// Example: Load preloaded components when needed
setTimeout(() => {
  loadComponentFromCache("#header", "header");
  loadComponentFromCache("#footer", "footer");
}, 2000);

export { modal };
