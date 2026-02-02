import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

const FACTORY_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "leaseAddress", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "landlord", "type": "address" },
            { "indexed": false, "internalType": "string", "name": "ipfsHash", "type": "string" }
        ],
        "name": "LeaseCreated",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_rentAmount", "type": "uint256" },
            { "internalType": "uint256", "name": "_securityDeposit", "type": "uint256" },
            { "internalType": "uint256", "name": "_leaseDuration", "type": "uint256" },
            { "internalType": "string", "name": "_ipfsHash", "type": "string" }
        ],
        "name": "createLease",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllLeases",
        "outputs": [{ "internalType": "contract LeaseAgreement[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_landlord", "type": "address" }],
        "name": "getLandlordLeases",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const

const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}` // Local Hardhat deployment

export function useRentChainFactory() {
    const { writeContract, data: hash, isPending, error } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash })

    const createLease = (rent: string, deposit: string, duration: number, ipfsHash: string) => {
        writeContract({
            address: FACTORY_ADDRESS,
            abi: FACTORY_ABI,
            functionName: 'createLease',
            args: [parseEther(rent), parseEther(deposit), BigInt(duration * 30 * 24 * 60 * 60), ipfsHash],
        })
    }

    return {
        createLease,
        hash,
        isPending,
        isConfirming,
        isConfirmed,
        error
    }
}

export function useLandlordLeases(address: `0x${string}` | undefined) {
    return useReadContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'getLandlordLeases',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    })
}
