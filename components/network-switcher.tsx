"use client"

import { useState } from "react"
import { Globe } from "lucide-react"

import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Network IDs - these would be the actual chain IDs for your specific networks
const NETWORKS = {
  MAINNET: 1, // Ethereum mainnet
  TESTNET: 5, // Goerli testnet
}

export function NetworkSwitcher() {
  const { chainId, switchChain } = useWeb3()
  const [isChanging, setIsChanging] = useState(false)

  const handleNetworkSwitch = async (networkId: number) => {
    setIsChanging(true)
    try {
      await switchChain(networkId)
    } catch (error) {
      console.error("Failed to switch network:", error)
    } finally {
      setIsChanging(false)
    }
  }

  const getNetworkName = (id: number | null) => {
    if (id === NETWORKS.MAINNET) return "Mainnet"
    if (id === NETWORKS.TESTNET) return "Testnet"
    return "Unknown Network"
  }

  const isMainnet = chainId === NETWORKS.MAINNET
  const isTestnet = chainId === NETWORKS.TESTNET

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1" disabled={isChanging}>
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">{chainId ? getNetworkName(chainId) : "Select Network"}</span>
          {isMainnet && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              Mainnet
            </Badge>
          )}
          {isTestnet && (
            <Badge variant="outline" className="ml-1 h-5 px-1.5 text-xs">
              Testnet
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch Network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleNetworkSwitch(NETWORKS.MAINNET)}
          disabled={isMainnet || isChanging}
          className="flex items-center justify-between"
        >
          Mainnet
          {isMainnet && (
            <Badge variant="secondary" className="ml-2">
              Connected
            </Badge>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNetworkSwitch(NETWORKS.TESTNET)}
          disabled={isTestnet || isChanging}
          className="flex items-center justify-between"
        >
          Testnet
          {isTestnet && (
            <Badge variant="secondary" className="ml-2">
              Connected
            </Badge>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

