import azureConfig from './azureConfig';
import flaskConfig from './fastApiConfig';

const getConfig = () => {
    const runtimeEnv = process.env.REACT_APP_RUNTIME_ENV; // Set this in your .env file

    switch (runtimeEnv) {
        case 'AZURE':
            return azureConfig;
        case 'FLASK':
            return flaskConfig;
        default:
            return flaskConfig; // Default to Flask or any other preferred default
    }
};

const config = getConfig();

export default config;
