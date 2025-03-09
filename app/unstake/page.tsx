import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConnectWallet } from "@/components/connect-wallet"

export default function UnstakePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Unstake FNE</h1>
            <p className="text-muted-foreground">Withdraw your staked FNE from validators</p>
          </div>
          <ConnectWallet />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Unstaking Form</CardTitle>
              <CardDescription>Choose a validator and the amount to unstake</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="validator">Select Staked Validator</Label>
                <Select>
                  <SelectTrigger id="validator">
                    <SelectValue placeholder="Select a validator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1289">Validator #1289 (50 ETH staked)</SelectItem>
                    <SelectItem value="8734">Validator #8734 (32 ETH staked)</SelectItem>
                    <SelectItem value="5432">Validator #5432 (46.5 ETH staked)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Unstake (FNE)</Label>
                <div className="flex items-center gap-2">
                  <Input id="amount" type="number" placeholder="0.0" min="0.1" step="0.1" />
                  <Button variant="outline">Max</Button>
                </div>
                <p className="text-xs text-muted-foreground">Available to unstake: 50 FNE</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Staked</span>
                    <span className="font-medium">50 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rewards Earned</span>
                    <span className="font-medium">1.2 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Unstaking Fee</span>
                    <span className="font-medium">0.001 FNE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gas Fee (estimated)</span>
                    <span className="font-medium">0.002 FNE</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Unstaking Period</h4>
                <p className="text-sm text-muted-foreground">
                  Your unstaked FNE will be available for withdrawal after a processing period of approximately 2-5
                  days.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Unstake FNE</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Unstaking Information</CardTitle>
              <CardDescription>Important details about unstaking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-medium">Withdrawal Process</h3>
                <p className="text-muted-foreground">
                  When you unstake FNE, your funds enter a queue and will be available after the processing period. This
                  delay is a security feature of the Fene network.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Rewards</h3>
                <p className="text-muted-foreground">
                  You will continue to earn rewards until your unstaking request is processed. These rewards will be
                  included in your final withdrawal amount.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Partial Unstaking</h3>
                <p className="text-muted-foreground">
                  You can choose to unstake only a portion of your ETH from a validator. The remaining amount will
                  continue to earn rewards.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Tax Implications</h3>
                <p className="text-muted-foreground">
                  Please consult with a tax professional regarding the tax implications of unstaking and receiving
                  staking rewards.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

