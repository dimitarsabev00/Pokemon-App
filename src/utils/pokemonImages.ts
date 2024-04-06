const shinyImages = import.meta.glob('../assets/images/pokemons/shiny/*.png');
const defaultImageS = import.meta.glob('../assets/images/pokemons/default/*.png');

const fetchImages = (imagePaths) => {
  const images = {};
  Object.entries(imagePaths).forEach(([path, value]) => {
    const key = path.split('/').pop().replace(/\.\w+$/, '');
    images[key] = value;
  });
  return images;
};

export const images = fetchImages(shinyImages);
export const defaultImages = fetchImages(defaultImageS);
