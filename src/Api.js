import firebase from 'firebase'

export async function getVegetables() {
    let vegetables = [];
    const database = firebase.database().ref('vegetables');
    const snapshot = await database.once('value');

    snapshot.forEach(veg => {
        vegetables.push(veg.val());
    })

    return  vegetables;
}

export async function getPasta() {
    let pasta = [];
    const database = firebase.database().ref('pasta');
    const snapshot = await database.once('value');

    snapshot.forEach(pas => {
        pasta.push(pas.val());
    })

    return pasta;
}

export async function getVarious() {
    let various = [];
    const database = firebase.database().ref('other');
    const snapshot = await database.once ('value');

    snapshot.forEach(vario => {
        various.push(vario.val());
    })

    return various;
}

export async function getRecipes() {
    let recipes = [];
    const database = firebase.database().ref("recipes");
    const snapshot =  await database.once ("value");
        snapshot.forEach(recipe => {
            recipes.push(recipe.val());
        })
    return recipes;
}

export async function getGroats() {
    let groats = [];
    const database = firebase.database().ref("groats");
    const snapshot =  await database.once ("value");
    snapshot.forEach(groat => {
        groats.push(groat.val());
    })
    return groats;
}


