import { NFTStorage, Blob } from 'nft.storage'

const IPFS_STORAGE_API_KEY = process.env.IPFS_STORAGE_API_KEY
const client = new NFTStorage({ token: IPFS_STORAGE_API_KEY })

export const store = async (file) => {
    const blobFile = new Blob(file)
    const cid = await client.storeBlob(blobFile)

    return `https://${cid}.ipfs.nftstorage.link/`;
}
