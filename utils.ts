import { Flight, FlightModel } from "./types.ts";

export const fromModelToFlight = (model: FlightModel) : Flight => {
    return{
        id: model._id!.toString(),
        origen: model.origen,
        destino: model.destino,
        fechaHora: model.fechaHora
    }
};