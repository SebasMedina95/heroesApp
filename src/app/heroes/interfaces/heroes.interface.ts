// To parse this data:
//
//   import { Convert } from "./file";
//
//   const heroeInterface = Convert.toHeroeInterface(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface HeroeInterface {
    id?:              string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string; //Almacenaremos el Path de la imagen.
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}

