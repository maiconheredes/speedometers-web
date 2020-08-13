import GlobalState from '../states/global.state';

const ENV = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const environment = GlobalState.environment[ENV];

export default environment;
