"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Web3ContextType {
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
  chainId: number | null
  switchChain: (chainId: number) => Promise<void>
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
  chainId: null,
  switchChain: async () => {},
})

export function useWeb3() {
  return useContext(Web3Context)
}

// Network configuration for adding networks that don't exist in the wallet
const NETWORK_CONFIG = {
  // Mainnet (Ethereum)
  1: {
    chainId: "0x1",
    chainName: "Fene Mainnet",
    nativeCurrency: {
      name: "Fene",
      symbol: "FNE",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.fene.network"],
    blockExplorerUrls: ["https://explorer.fene.network"],
  },
  // Testnet (Goerli)
  5: {
    chainId: "0x5",
    chainName: "Fene Testnet",
    nativeCurrency: {
      name: "Fene",
      symbol: "FNE",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.fene.network"],
    blockExplorerUrls: ["https://testnet-explorer.fene.network"],
  },
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            setChainId(Number.parseInt(chainId, 16))
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  // Listen for account and chain changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAddress(null)
        } else {
          setAddress(accounts[0])
        }
      }

      const handleChainChanged = (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const connect = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsConnecting(true)
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAddress(accounts[0])
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        setChainId(Number.parseInt(chainId, 16))
      } catch (error) {
        console.error("Error connecting wallet:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      window.open("https://metamask.io/download/", "_blank")
    }
  }

  const disconnect = () => {
    setAddress(null)
  }

  const switchChain = async (chainId: number) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        })
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (error.code === 4902) {
          try {
            // Add the network using the predefined configuration
            const config = NETWORK_CONFIG[chainId as keyof typeof NETWORK_CONFIG]
            if (config) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [config],
              })
            } else {
              throw new Error(`Network configuration not found for chain ID: ${chainId}`)
            }
          } catch (addError) {
            console.error("Error adding network:", addError)
            throw addError
          }
        } else {
          console.error("Error switching chain:", error)
          throw error
        }
      }
    } else {
      throw new Error("Ethereum provider not found")
    }
  }

  return (
    <Web3Context.Provider
      value={{
        address,
        connect,
        disconnect,
        isConnecting,
        chainId,
        switchChain,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

// Add this to make TypeScript happy with window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: any) => Promise<any>
      on: (event: string, callback: any) => void
      removeListener: (event: string, callback: any) => void
    }
  }
}

