import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pecheurs from './pecheurs/pecheur';
import Factures from './factures/facture';
import Zones from './zones/zone';
import Attributions from './attributions/attribution';
import Pirogues from './pirogues/pirogue';
import Filets from './filets/filet';
import { DashboardPage } from './dashboard';
import NewPecheur from './pecheurs/newPecheur';
import NewGroupement from './groupements/newGroupement';
import NewZone from './zones/newZone';
import NewAttribution from './attributions/newAttribution';
import NewPirogue from './pirogues/newPirogue';
import NewFilet from './filets/newFilet';
import NewFacture from './factures/newFacture';
import EditGroupement from './groupements/updateGroupement';
import EditPecheur from './pecheurs/updatePecheur';
import EditFacture from './factures/updateFacture';
import EditZone from './zones/updateZone';
import EditAttribution from './attributions/updateAttribution';
import EditPirogue from './pirogues/updatePirogue';
import EditFilet from './filets/updateFilet';
import Layout from './components/Layout';
import Groupements from './groupements/groupements';
import PecheurDetails from './pecheurs/pecheurDetail';
import FactureDetails from './factures/factureDetail';
import AttributionDetails from './attributions/attributionDetail';
import PirogueDetails from './pirogues/pirogueDetail';
import FiletDetails from './filets/filetDetail';
import GroupementDetails from './groupements/groupementDetail';
import ZoneDetails from './zones/zoneDetail';


const App = () => {
    return (
        <Router>
            <Routes>
            
            <Route path="/" element={<Layout />} >
                <Route index element={<DashboardPage />} />
                <Route path="/groupements" element={<Groupements />} />
                <Route path="/pecheurs" element={<Pecheurs />} />
                <Route path="/factures" element={<Factures />} />
                <Route path="/zones" element={<Zones />} />
                <Route path="/attributions" element={<Attributions />} />
                <Route path="/pirogues" element={<Pirogues />} />
                <Route path="/filets" element={<Filets />} />
                <Route path="/groupements/new" element={<NewGroupement />} />
                <Route path="/pecheurs/new" element={<NewPecheur />} />
                <Route path="/factures/new" element={<NewFacture/>} />
                <Route path="/zones/new" element={<NewZone />} />
                <Route path="/attributions/new" element={<NewAttribution />} />
                <Route path="/pirogues/new" element={<NewPirogue />} />
                <Route path="/filets/new" element={<NewFilet />} />
                <Route path="/groupements/:id/edit" element={<EditGroupement />} />
                <Route path="/pecheurs/:id/edit" element={<EditPecheur />} />
                <Route path="/factures/:id/edit" element={<EditFacture />} />
                <Route path="/zones/:id/edit" element={<EditZone />} />
                <Route path="/attributions/:id/edit" element={<EditAttribution />} />
                <Route path="/pirogues/:id/edit" element={<EditPirogue />} />
                <Route path="/filets/:id/edit" element={<EditFilet />} />
                <Route path="/groupements/:id" element={<GroupementDetails />} />
                <Route path="/pecheurs/:id" element={<PecheurDetails />} />
                <Route path="/factures/:id" element={<FactureDetails />} />
                <Route path="/attributions/:id" element={<AttributionDetails/>} />
                <Route path="/pirogues/:id" element={<PirogueDetails />} />
                <Route path="/filets/:id" element={<FiletDetails />} />
                <Route path="/zones/:id" element={<ZoneDetails/>} />
            </Route>

            </Routes>
        </Router>
    );
};

export default App;
