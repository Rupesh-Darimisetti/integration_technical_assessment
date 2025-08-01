import {
    Autocomplete,
    Box,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { DataForm } from './data-form';
import { AirtableIntegration } from './integrations/airtable';
import { HubSpotIntegration } from './integrations/hubspot';
import { NotionIntegration } from './integrations/notion';

const integrationMapping = {
    'Notion': NotionIntegration,
    'Airtable': AirtableIntegration,
    'HubSpot': HubSpotIntegration,
};

export const IntegrationForm = () => {
    const [integrationParams, setIntegrationParams] = useState({});
    const [user, setUser] = useState('TestUser');
    const [org, setOrg] = useState('TestOrg');
    const [currType, setCurrType] = useState(null);
    const CurrIntegration = integrationMapping[currType];

    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ width: '100%' }}>
            <Box display='flex' flexDirection='column'>
                <TextField
                    label="User"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Organization"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Autocomplete
                    id="integration-type"
                    options={Object.keys(integrationMapping)}
                    sx={{ width: 300, mt: 2 }}
                    renderInput={(params) => <TextField {...params} label="Integration Type" />}
                    onChange={(e, value) => setCurrType(value)}
                />
            </Box>
            {currType &&
                <Box>
                    <CurrIntegration user={user} org={org} integrationParams={integrationParams} setIntegrationParams={setIntegrationParams} />
                </Box>
            }
            {integrationParams?.credentials &&
                <Box sx={{ mt: 2 }}>
                    <DataForm integrationType={integrationParams?.type} credentials={integrationParams?.credentials} />
                </Box>
            }
        </Box>
    );
}
