import { store } from './ipfs'
import { DAPP__DATA } from '../view/assets/data/data'
import { 
    requestToPublishApp,
    getUserPublishedApps,
    getUserRequestedApps,
    getUserUsingApps,
    getAppInfo,
    registerApp,
    rejectApp,
    publishApp,
    getRequestedApps,
    getPublishedApps,
} from '../../truffle/script/utils'
import { deployScWithCode } from '../../truffle/script/deploy'

/***
 * get dApp info
 */
export const getAppDetail = async (appId) => {
    return getAppInfo(appId);
}

/***
 * get all dApps published by the connected user
 */
export const getMyPublishedApps = async () => {
    return getUserPublishedApps(window.ethereum.selectedAddress);
}

/***
 * get all dApps requested by the connected user
 */
export const getMyRequestedApps = async () => {
    return await getUserRequestedApps(window.ethereum.selectedAddress);
}

/***
 * get all dApps using by the connected user
 */
export const getMyUsingApps = async () => {
    return await getUserUsingApps(window.ethereum.selectedAddress);
}

/***
 * get all dApps requested by developers
 */
export const fetchRequestedApps = async () => {
    return await getRequestedApps();
}

/***
 * get all dApps published by admin
 */
export const fetchPublishedApps = async () => {
    return await getPublishedApps();
}

/***
 * register to use an app
 */
export const registerToUseApp = async (appId) => {
    return await registerApp(appId);
}

/***
 * admin rejects an app
 */
export const reject = async (appId) => {
    return await rejectApp(appId);
}

/***
 * admin publishes an app
 */
export const publish = async (appId) => {
    return await publishApp(appId);
}

/***
 * submit dApp to be reviewed by admin
 */
export const submitApp = async (
    name,
    description,
    image,
    tags,
    website,
    github,
    discord,
    telegram,
    smartContract,
    usingPrice
) => {
    // upload files to IPFS
    const imageUrl = await store(image);
    const smartContractUrl = await store(smartContract);

    const txHash = await requestToPublishApp(
        name,
        description,
        imageUrl,
        tags,
        website,
        github,
        discord,
        telegram,
        smartContractUrl,
        usingPrice
    );

    return txHash;
}

/***
 * get some demo apps
 */
export const getDemoApps = async () => {
    return DAPP__DATA;
}

/***
 * deploy SC for user
 */
export const deploy = async (ScUrl) => {
    return await deployScWithCode(ScUrl);
}