import AsyncStorage from "@react-native-async-storage/async-storage";
//Buscar favortios
//Salvar um novo favorito
// Remover um favorito da lista

export async function getFavorites(key) {
  const favorites = await AsyncStorage.getItem(key);
  return JSON.parse(favorites) || [];
}

export async function saveFavortes(key, newItem) {
  let myFavorites = await getFavorites(key);

  let hasItem = myFavorites.some((item) => item.id === newItem.id);

  if (hasItem) {
    console.log("Item ja salvo");
    return;
  }

  myFavorites.push(newItem);
  await AsyncStorage.setItem(key, JSON.stringify(myFavorites));
  console.log("Salvo com sucesso");
}

export async function removeItem(id) {
  let receipes = await getFavorites("@appreceipes");
  let myFavorites = receipes.filter((item) => {
    return item.id !== id;
  });

  await AsyncStorage.setItem("@appreceipes", JSON.stringify(myFavorites));
  console.log("Item deletado com sucesso");
  return myFavorites;
}

export async function isFavorite(receipes) {
  let myReceipes = await getFavorites("@appreceipes");
  const favorite = myReceipes.find((item) => item.id === receipes.id);
  if (favorite) {
    return true;
  }
  return false;
}
