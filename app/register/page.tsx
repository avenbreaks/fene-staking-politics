"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ConnectWallet } from "@/components/connect-wallet"
import { Minus, Plus, ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Register as Validator</h1>
            <p className="text-muted-foreground">Set up your node to become a Fene validator</p>
          </div>
          <ConnectWallet />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Validator Registration</CardTitle>
              <CardDescription>Complete the form to register as a validator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposit Amount (FNE)</Label>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>32 FNE</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Select Deposit Amount</DrawerTitle>
                        <DrawerDescription>Choose how much FNE you want to stake as a validator</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => document.getElementById("deposit-amount")?.stepDown()}
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <Input
                            id="deposit-amount"
                            type="number"
                            defaultValue="32"
                            min="32"
                            step="1"
                            className="h-8 w-24 text-center"
                          />
                          <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => document.getElementById("deposit-amount")?.stepUp()}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                        <div className="mt-3 h-[120px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: "32", value: 32 },
                                { name: "64", value: 64 },
                                { name: "96", value: 96 },
                                { name: "128", value: 128 },
                              ]}
                            >
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Bar dataKey="value" fill="#FF7E67" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button>Confirm Amount</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
                <p className="text-xs text-muted-foreground">The minimum required deposit is 32 FNE</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdrawal-address">Withdrawal Address</Label>
                <Input id="withdrawal-address" placeholder="0x..." />
                <p className="text-xs text-muted-foreground">
                  This address will receive your staking rewards and deposit when you exit
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fee-recipient">Fee Recipient Address</Label>
                <Input id="fee-recipient" placeholder="0x..." />
                <p className="text-xs text-muted-foreground">
                  This address will receive transaction fees from blocks you propose
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Balance</span>
                    <span className="font-medium">45.0 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Required Deposit</span>
                    <span className="font-medium">32.0 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gas Fee (estimated)</span>
                    <span className="font-medium">0.005 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Remaining Balance</span>
                    <span className="font-medium">12.995 FNE</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I understand the responsibilities and risks
                  </label>
                  <p className="text-xs text-muted-foreground">
                    I understand that I must maintain my validator node and that my stake may be slashed for malicious
                    behavior or downtime.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Register Validator</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Validator Requirements</CardTitle>
              <CardDescription>Important information for validators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-medium">Hardware Requirements</h3>
                <p className="text-muted-foreground">
                  Running a validator node requires a dedicated machine with at least 8GB RAM, 2TB SSD, and a stable
                  internet connection.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Responsibilities</h3>
                <p className="text-muted-foreground">
                  Validators must maintain their nodes 24/7 and ensure they are properly configured and updated.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Slashing Risks</h3>
                <p className="text-muted-foreground">
                  Validators can be slashed (penalized) for malicious behavior or extended downtime. This can result in
                  the loss of some or all of your staked FNE.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Exit Process</h3>
                <p className="text-muted-foreground">
                  Exiting as a validator requires a waiting period before your staked FNE is returned to your withdrawal
                  address.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

