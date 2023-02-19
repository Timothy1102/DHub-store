export const truncatAddress = (address) => {
    if (address) {
        const shortAddress = `${address.substring(0, 4)}...${address.substring(address.length - 3)}`
        
        return shortAddress
    }

    return address
}
