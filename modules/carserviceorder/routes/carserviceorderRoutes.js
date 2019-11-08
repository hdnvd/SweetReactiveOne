
import carserviceorder_requestRoutes from './carserviceorder_requestRoutes';
import carserviceorder_carRoutes from './carserviceorder_carRoutes';
import carserviceorder_carmakerRoutes from './carserviceorder_carmakerRoutes';
    let carserviceorderRoutes=Object.assign({}, carserviceorder_requestRoutes,carserviceorder_carRoutes,carserviceorder_carmakerRoutes);
export default carserviceorderRoutes;
