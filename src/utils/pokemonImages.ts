const fetchImages = async (directory: string) => {
  const images: Record<string, any> = {};
  const imageFiles = await import(
    `../assets/images/pokemons/${directory}/*.png`
  );
  for (const path in imageFiles) {
    images[path] = imageFiles[path].default;
  }
  return images;
};

export const images = await fetchImages("shiny");
export const defaultImages = await fetchImages("default");
