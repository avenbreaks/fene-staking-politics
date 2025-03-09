"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Coins, Upload, AlertCircle, Check, Info, Loader2, Shield, Zap, FileCode, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ConnectWallet } from "@/components/connect-wallet"
import { useWeb3 } from "@/components/web3-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Network configurations
const NETWORKS = [
  {
    id: 1,
    name: "Ethereum",
    icon: "/placeholder.svg?height=24&width=24",
    testnet: "Goerli",
    mainnetFee: 0.15,
    testnetFee: 0.05,
    color: "#627EEA",
  },
  {
    id: 56,
    name: "Binance Smart Chain",
    icon: "/placeholder.svg?height=24&width=24",
    testnet: "BSC Testnet",
    mainnetFee: 0.1,
    testnetFee: 0.03,
    color: "#F3BA2F",
  },
  {
    id: 8453,
    name: "Base",
    icon: "/placeholder.svg?height=24&width=24",
    testnet: "Base Goerli",
    mainnetFee: 0.08,
    testnetFee: 0.02,
    color: "#0052FF",
  },
  {
    id: 10,
    name: "Optimism",
    icon: "/placeholder.svg?height=24&width=24",
    testnet: "Optimism Goerli",
    mainnetFee: 0.08,
    testnetFee: 0.02,
    color: "#FF0420",
  },
  {
    id: 137,
    name: "Polygon",
    icon: "/placeholder.svg?height=24&width=24",
    testnet: "Mumbai",
    mainnetFee: 0.05,
    testnetFee: 0.01,
    color: "#8247E5",
  },
  {
    id: 42161,
    name: "Arbitrum",
    icon: "/placeholder.svg?height=24&width=24",
    testnet: "Arbitrum Goerli",
    mainnetFee: 0.08,
    testnetFee: 0.02,
    color: "#28A0F0",
  },
]

// Token standards
const TOKEN_STANDARDS = [
  {
    id: "erc20",
    name: "ERC-20",
    description: "Fungible token standard for cryptocurrencies and utility tokens",
    icon: <Coins className="h-6 w-6" />,
    features: ["Fungible", "Divisible", "Transferable"],
  },
  {
    id: "erc721",
    name: "ERC-721",
    description: "Non-fungible token standard for unique digital assets",
    icon: <FileCode className="h-6 w-6" />,
    features: ["Non-Fungible", "Unique", "Metadata"],
  },
  {
    id: "erc1155",
    name: "ERC-1155",
    description: "Multi-token standard for both fungible and non-fungible tokens",
    icon: <Layers className="h-6 w-6" />,
    features: ["Multi-Token", "Batch Transfers", "Semi-Fungible"],
  },
]

export default function TokenGeneratorPage() {
  const { address, chainId, switchChain } = useWeb3()
  const [isMainnet, setIsMainnet] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0])
  const [tokenStandard, setTokenStandard] = useState("erc20")
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [totalSupply, setTotalSupply] = useState("1000000")
  const [decimals, setDecimals] = useState(18)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStep, setDeploymentStep] = useState(0)
  const [deploymentSuccess, setDeploymentSuccess] = useState(false)
  const [deploymentError, setDeploymentError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Advanced options
  const [hasBurnable, setHasBurnable] = useState(true)
  const [hasPausable, setHasPausable] = useState(false)
  const [hasMintable, setHasMintable] = useState(true)
  const [hasPermit, setHasPermit] = useState(false)
  const [hasVotes, setHasVotes] = useState(false)
  const [hasFlashMinting, setHasFlashMinting] = useState(false)
  const [hasSnapshots, setHasSnapshots] = useState(false)

  // Handle network change
  const handleNetworkChange = (networkId: string) => {
    const network = NETWORKS.find((n) => n.id.toString() === networkId)
    if (network) {
      setSelectedNetwork(network)
    }
  }

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Calculate deployment fee
  const getDeploymentFee = () => {
    return isMainnet ? selectedNetwork.mainnetFee : selectedNetwork.testnetFee
  }

  // Handle deployment
  const handleDeploy = async () => {
    if (!address) {
      alert("Please connect your wallet first")
      return
    }

    // Validate form
    if (!tokenName || !tokenSymbol || !totalSupply) {
      setDeploymentError("Please fill in all required fields")
      return
    }

    setIsDeploying(true)
    setDeploymentStep(1)
    setDeploymentError(null)

    try {
      // Switch to the correct network if needed
      const targetChainId = isMainnet ? selectedNetwork.id : selectedNetwork.id + 1 // Simplified; in reality testnet IDs vary
      if (chainId !== targetChainId) {
        await switchChain(targetChainId)
      }

      // Simulate deployment steps
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setDeploymentStep(2)

      await new Promise((resolve) => setTimeout(resolve, 2000))
      setDeploymentStep(3)

      await new Promise((resolve) => setTimeout(resolve, 2000))
      setDeploymentStep(4)

      // Simulate successful deployment
      setDeploymentSuccess(true)
    } catch (error) {
      console.error("Deployment error:", error)
      setDeploymentError("Failed to deploy token. Please try again.")
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Token Generator</h1>
            <p className="text-muted-foreground">Create and deploy custom tokens on multiple blockchains</p>
          </div>
          <ConnectWallet />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Token Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Network Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Network Selection
                </CardTitle>
                <CardDescription>Choose the blockchain network for your token deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="network-type" className="text-base">
                    Network Type
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="testnet" className={!isMainnet ? "font-medium" : "text-muted-foreground"}>
                      Testnet
                    </Label>
                    <Switch id="network-type" checked={isMainnet} onCheckedChange={setIsMainnet} />
                    <Label htmlFor="mainnet" className={isMainnet ? "font-medium" : "text-muted-foreground"}>
                      Mainnet
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="network">Blockchain Network</Label>
                  <Select onValueChange={handleNetworkChange} defaultValue={selectedNetwork.id.toString()}>
                    <SelectTrigger id="network" className="w-full">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      {NETWORKS.map((network) => (
                        <SelectItem key={network.id} value={network.id.toString()}>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: network.color }} />
                            {network.name} {!isMainnet && `(${network.testnet})`}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Token Standard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  Token Standard
                </CardTitle>
                <CardDescription>Select the token standard that fits your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="erc20"
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  onValueChange={setTokenStandard}
                >
                  {TOKEN_STANDARDS.map((standard) => (
                    <div key={standard.id} className="relative">
                      <RadioGroupItem value={standard.id} id={standard.id} className="peer sr-only" />
                      <Label
                        htmlFor={standard.id}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 rounded-full bg-primary/10 p-2 text-primary">{standard.icon}</div>
                        <div className="font-semibold">{standard.name}</div>
                        <div className="text-xs text-center text-muted-foreground mt-1">{standard.description}</div>
                        <div className="mt-3 flex flex-wrap justify-center gap-1">
                          {standard.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Token Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-primary" />
                  Token Details
                </CardTitle>
                <CardDescription>Configure the basic properties of your token</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="token-name">Token Name</Label>
                    <Input
                      id="token-name"
                      placeholder="e.g., My Awesome Token"
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">The full name of your token</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="token-symbol">Token Symbol</Label>
                    <Input
                      id="token-symbol"
                      placeholder="e.g., MAT"
                      maxLength={8}
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                    />
                    <p className="text-xs text-muted-foreground">A short ticker symbol (2-8 characters)</p>
                  </div>
                </div>

                {tokenStandard === "erc20" && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="total-supply">Total Supply</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>The initial amount of tokens to create</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="total-supply"
                        type="number"
                        placeholder="1000000"
                        value={totalSupply}
                        onChange={(e) => setTotalSupply(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Actual amount: {Number(totalSupply).toLocaleString()} tokens with {decimals} decimals
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="decimals">Decimals</Label>
                        <span className="text-sm font-medium">{decimals}</span>
                      </div>
                      <Slider
                        id="decimals"
                        min={0}
                        max={18}
                        step={1}
                        value={[decimals]}
                        onValueChange={(value) => setDecimals(value[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Divisibility of your token (18 is standard for most tokens)
                      </p>
                    </div>
                  </>
                )}

                {tokenStandard === "erc721" && (
                  <div className="space-y-2">
                    <Label htmlFor="base-uri">Base URI</Label>
                    <Input id="base-uri" placeholder="https://example.com/api/token/" />
                    <p className="text-xs text-muted-foreground">
                      The base URI for token metadata (can be updated later)
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="logo">Token Logo</Label>
                  <div className="flex items-center gap-4">
                    <div
                      className="h-16 w-16 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center overflow-hidden"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {logoPreview ? (
                        <Image
                          src={logoPreview || "/placeholder.svg"}
                          alt="Token logo preview"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      ) : (
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        ref={fileInputRef}
                        id="logo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                        {logoFile ? "Change Logo" : "Upload Logo"}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">Recommended: 200x200px PNG or SVG</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advanced-options">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Advanced Options</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="border-none shadow-none">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tokenStandard === "erc20" && (
                          <>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="burnable" className="flex items-center gap-2">
                                Burnable
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Allows token holders to burn (destroy) their tokens</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="burnable" checked={hasBurnable} onCheckedChange={setHasBurnable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="pausable" className="flex items-center gap-2">
                                Pausable
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Allows the owner to pause all token transfers</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="pausable" checked={hasPausable} onCheckedChange={setHasPausable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="mintable" className="flex items-center gap-2">
                                Mintable
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Allows the owner to mint additional tokens after deployment</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="mintable" checked={hasMintable} onCheckedChange={setHasMintable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="permit" className="flex items-center gap-2">
                                Permit
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Enables gasless approvals via signatures (EIP-2612)</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="permit" checked={hasPermit} onCheckedChange={setHasPermit} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="votes" className="flex items-center gap-2">
                                Votes
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Enables voting capabilities for governance</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="votes" checked={hasVotes} onCheckedChange={setHasVotes} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="flash-minting" className="flex items-center gap-2">
                                Flash Minting
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Allows flash loans of the token</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch
                                id="flash-minting"
                                checked={hasFlashMinting}
                                onCheckedChange={setHasFlashMinting}
                              />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="snapshots" className="flex items-center gap-2">
                                Snapshots
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Enables creating balance snapshots for voting or rewards</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="snapshots" checked={hasSnapshots} onCheckedChange={setHasSnapshots} />
                            </div>
                          </>
                        )}

                        {tokenStandard === "erc721" && (
                          <>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="burnable" className="flex items-center gap-2">
                                Burnable
                              </Label>
                              <Switch id="burnable" checked={hasBurnable} onCheckedChange={setHasBurnable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="pausable" className="flex items-center gap-2">
                                Pausable
                              </Label>
                              <Switch id="pausable" checked={hasPausable} onCheckedChange={setHasPausable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="mintable" className="flex items-center gap-2">
                                Mintable
                              </Label>
                              <Switch id="mintable" checked={hasMintable} onCheckedChange={setHasMintable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="enumerable" className="flex items-center gap-2">
                                Enumerable
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Enables on-chain enumeration of all tokens</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="enumerable" checked={hasVotes} onCheckedChange={setHasVotes} />
                            </div>
                          </>
                        )}

                        {tokenStandard === "erc1155" && (
                          <>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="burnable" className="flex items-center gap-2">
                                Burnable
                              </Label>
                              <Switch id="burnable" checked={hasBurnable} onCheckedChange={setHasBurnable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="pausable" className="flex items-center gap-2">
                                Pausable
                              </Label>
                              <Switch id="pausable" checked={hasPausable} onCheckedChange={setHasPausable} />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                              <Label htmlFor="supply-tracking" className="flex items-center gap-2">
                                Supply Tracking
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Tracks the total supply of each token ID</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Label>
                              <Switch id="supply-tracking" checked={hasVotes} onCheckedChange={setHasVotes} />
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Column - Deployment Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Deployment Summary</CardTitle>
                <CardDescription>Review your token configuration before deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-medium">
                      {selectedNetwork.name} {!isMainnet && `(${selectedNetwork.testnet})`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Token Standard</span>
                    <span className="font-medium">
                      {TOKEN_STANDARDS.find((s) => s.id === tokenStandard)?.name || tokenStandard.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Token Name</span>
                    <span className="font-medium">{tokenName || "Not set"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Token Symbol</span>
                    <span className="font-medium">{tokenSymbol || "Not set"}</span>
                  </div>
                  {tokenStandard === "erc20" && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Supply</span>
                        <span className="font-medium">{Number(totalSupply).toLocaleString() || "0"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Decimals</span>
                        <span className="font-medium">{decimals}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Features</h3>
                  <div className="flex flex-wrap gap-1">
                    {hasBurnable && <Badge variant="outline">Burnable</Badge>}
                    {hasPausable && <Badge variant="outline">Pausable</Badge>}
                    {hasMintable && <Badge variant="outline">Mintable</Badge>}
                    {hasPermit && <Badge variant="outline">Permit</Badge>}
                    {hasVotes && <Badge variant="outline">Votes</Badge>}
                    {hasFlashMinting && <Badge variant="outline">Flash Minting</Badge>}
                    {hasSnapshots && <Badge variant="outline">Snapshots</Badge>}
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Deployment Fee</span>
                    <span className="font-bold">{getDeploymentFee()} ETH</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Gas (estimated)</span>
                    <span>~0.005 ETH</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>{getDeploymentFee() - 0.005} ETH</span>
                  </div>
                </div>

                {deploymentError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{deploymentError}</AlertDescription>
                  </Alert>
                )}

                {isDeploying && (
                  <div className="space-y-2">
                    <Progress value={deploymentStep * 25} className="h-2" />
                    <p className="text-sm text-center">
                      {deploymentStep === 1 && "Preparing contract..."}
                      {deploymentStep === 2 && "Compiling contract..."}
                      {deploymentStep === 3 && "Deploying to blockchain..."}
                      {deploymentStep === 4 && "Verifying contract..."}
                    </p>
                  </div>
                )}

                {deploymentSuccess && (
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-800 dark:text-green-400">Deployment Successful</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-500">
                      Your token has been successfully deployed to the blockchain.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full py-6 text-lg"
                  size="lg"
                  disabled={isDeploying || !address || deploymentSuccess}
                  onClick={handleDeploy}
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deploying...
                    </>
                  ) : deploymentSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Deployed Successfully
                    </>
                  ) : (
                    "Deploy Token"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

