import { Request, Response } from "express";
import axios from "axios";

export const brewerieController = {
    searchBrewerie: async(req: Request, res: Response) => {
        const query = req.query.query;
        
        // Construir a URL da API OpenBreweryDB com o parâmetro de consulta
        const url = `https://api.openbrewerydb.org/breweries/search?query=${query}`;

        // Fazer uma solicitação GET à API
        const response = await axios.get(url);

        // Obter os dados da resposta da API
        const breweries = response.data;

        // Enviar a resposta com os dados das cervejarias
        res.json(breweries);

        return response;
    }
}