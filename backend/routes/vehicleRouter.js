import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Vehicle from '../model/vehicleModel.js';

const vehicleRouter = express.Router();

// Retrieve all vehicle details
vehicleRouter.get('/', expressAsyncHandler( async(req,res) => {
    const vehicle = await Vehicle.find({});
    res.send(vehicle);
}))

// Retrieve only the selected vehicle information
vehicleRouter.get('/:id', expressAsyncHandler(async(req,res) => {
    const vehicle = await Vehicle.findById(req.params.id);
    if(vehicle){
        res.send(vehicle);
    } else {
        res.status(404)
        .message({message: "Vehicle not found"});
    }
}))

// Add details of vehicles
vehicleRouter.post('/', expressAsyncHandler (async(req,res) => {
    const vehicle = new Vehicle({
        year: req.body.year,
        vehicleModel: req.body.vehicleModel,
        bodyType: req.body.bodyType,
        image: req.body.image,
        transmission: req.body.transmission,
        driveTrain: req.body.driveTrain,
        engine: req.body.engine,
        fuelType:req.body.fuelType,
        fuelEconomy: req.body.fuelEconomy,
        trim: req.body.trim,
        mileage: req.body.mileage,
        interiorColor: req.body.interiorColor,
        exteriorColor: req.body.exteriorColor,
        stockNumber: req.body.stockNumber,
        price: req.body.price,
        vehicleCondition: req.body.vehicleCondition,
        vehicleBrand: req.body.vehicleBrand,
        engineCapacity: req.body.engineCapacity,
        vehicleOptions: req.body.vehicleOptions,
        additionalInformation: req.body.additionalInformation,  
    })
    const createVehicle = await vehicle.save()
    res.send({message: "Vehicle added", vehicle: createVehicle});
}))

vehicleRouter.delete('/:id', expressAsyncHandler(async(req,res) => {
    try{
        const vehicle = await Vehicle.findById(req.params.id);

        if(!vehicle){
            return res.status(404).send({message: 'Vehicle not found'});
        }
        return res.status(200).send({message: 'Vehicle deleted successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
}))

//Update selected vehicle
vehicleRouter.put('/:id', async(request,response) => {
    try{
        if(
            !request.body.year||
            !request.body.vehicleModel||
            !request.body.bodyType||
            !request.body.image||
            !request.body.transmission||
            !request.body.driveTrain||
            !request.body.engine||
            !request.body.fuelType||
            !request.body.fuelEconomy||
            !request.body.trim||
            !request.body.mileage||
            !request.body.interiorColor||
            !request.body.exteriorColor||
            !request.body.stockNumber||
            !request.body.price||
            !request.body.vehicleCondition||
            !request.body.vehicleBrand||
            !request.body.engineCapacity||
            !request.body.vehicleOptions||
            !request.body.additionalInformation
        ){
            return response.status(400).send({message: "Send all the required fields"});
        }
        const {id} = request.params;

        const vehicle = await Vehicle.findByIdAndUpdate(id, request.body);

        if(!vehicle){
            return response.status(404).json({message: 'Vehicle not found'});
        }
        return response.status(200).send({message: "Vehicle updated successfully"})
    } catch (error){
        response.status(500).send({message: error.message});
    }
});

export default vehicleRouter;