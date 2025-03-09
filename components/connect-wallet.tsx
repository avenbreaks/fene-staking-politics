"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWeb3 } from "@/components/web3-provider"

export function ConnectWallet() {
  const [open, setOpen] = useState(false)
  const { address, connect, disconnect } = useWeb3()

  const handleConnect = async () => {
    await connect()
    setOpen(false)
  }

  if (address) {
    return (
      <Button variant="outline" onClick={disconnect}>
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Connect your wallet to access the staking dashboard</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={handleConnect} className="w-full">
            MetaMask
          </Button>
          <Button variant="outline" className="w-full">
            WalletConnect
          </Button>
          <Button variant="outline" className="w-full">
            Coinbase Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

