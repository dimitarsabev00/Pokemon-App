const shinyImages = import.meta.glob('../assets/images/pokemons/shiny/*.png');
const defaultImageS = import.meta.glob('../assets/images/pokemons/default/*.png');

const fetchImages = async (imagePaths) => {
  const images = {};
  await Promise.all(
    Object.entries(imagePaths).map(async ([path, value]) => {
      const key = path.split('/').pop().replace(/.\w+$/, '');
      const imageModule = await value();
      images[key] = imageModule.default;
    })
  );
  return images;
};

export const images = await fetchImages(shinyImages);
export const defaultImages = await fetchImages(defaultImageS);
