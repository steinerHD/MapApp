

export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    language_es?:  Language;
    place_name_es: string;
    text:          string;
    language?:     Language;
    place_name:    string;
    bbox?:         number[];
    center:        number[];
    geometry:      Geometry;
    context:       Context[];
}

export interface Context {
    id:           string;
    wikidata?:    Wikidata;
    short_code?:  string;
    text_es:      string;
    language_es?: Language;
    text:         string;
    language?:    Language;
}

export enum Language {
    Es = "es",
}

export enum Wikidata {
    Q1093102 = "Q1093102",
    Q232564 = "Q232564",
    Q739 = "Q739",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    short_code?: string;
    wikidata?:   string;
    accuracy?:   string;
}
