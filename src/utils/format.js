export const truncatAddress = (address) => {
    if (address) {
        const shortAddress = `${address.substring(0, 3)}...${address.substring(address.length - 4)}`
        
        return shortAddress
    }

    return address
}
