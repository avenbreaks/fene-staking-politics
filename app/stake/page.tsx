import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConnectWallet } from "@/components/connect-wallet"

export default function StakePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stake FNE</h1>
            <p className="text-muted-foreground">Stake your FNE with a validator to earn rewards</p>
          </div>
          <ConnectWallet />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Staking Form</CardTitle>
              <CardDescription>Choose a validator and the amount to stake</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="validator">Select Validator</Label>
                <Select>
                  <SelectTrigger id="validator">
                    <SelectValue placeholder="Select a validator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1289">Validator #1289 (4.5% APR)</SelectItem>
                    <SelectItem value="8734">Validator #8734 (4.2% APR)</SelectItem>
                    <SelectItem value="5432">Validator #5432 (4.7% APR)</SelectItem>
                    <SelectItem value="9876">Validator #9876 (4.3% APR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Stake (FNE)</Label>
                <div className="flex items-center gap-2">
                  <Input id="amount" type="number" placeholder="0.0" min="0.1" step="0.1" />
                  <Button variant="outline">Max</Button>
                </div>
                <p className="text-xs text-muted-foreground">Minimum stake: 0.1 FNE</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Balance</span>
                    <span className="font-medium">5.0 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estimated APR</span>
                    <span className="font-medium">4.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estimated Daily Rewards</span>
                    <span className="font-medium">0.0012 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gas Fee (estimated)</span>
                    <span className="font-medium">0.002 FNE</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Stake FNE</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Staking Information</CardTitle>
              <CardDescription>Important details about staking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-medium">What is staking?</h3>
                <p className="text-muted-foreground">
                  Staking is the process of depositing FNE to become a validator on the Fene network. Validators help
                  secure the network and earn rewards in return.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Rewards</h3>
                <p className="text-muted-foreground">
                  Staking rewards are distributed based on the validator's performance and the amount staked. The
                  current average APR is around 4-5%.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Risks</h3>
                <p className="text-muted-foreground">
                  Validators can be slashed (penalized) for malicious behavior or being offline. As a delegator, your
                  stake may be affected if the validator you choose is slashed.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Unstaking</h3>
                <p className="text-muted-foreground">
                  You can unstake your ETH at any time, but there may be a waiting period before your funds are
                  available for withdrawal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

