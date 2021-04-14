export const defaultColor = "dark";
const themeColorStorageKey = "theme";

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey) ?? defaultColor;
    }
  } catch (error) {
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color: string) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {}
};
