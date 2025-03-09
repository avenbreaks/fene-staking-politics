import { ArrowUpDown, ChevronDown, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ConnectWallet } from "@/components/connect-wallet"

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
            <p className="text-muted-foreground">View your staking and reward transactions</p>
          </div>
          <ConnectWallet />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center gap-2">
            <Input placeholder="Search transactions..." className="h-9 md:w-[300px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  Type
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Stake</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Unstake</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Reward</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  Date Range
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by date</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Last 7 days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Last 30 days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last 90 days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>All time</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>A record of all your staking activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Validator</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Amount
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Mar 8, 2025</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Reward
                    </div>
                  </TableCell>
                  <TableCell>#1289</TableCell>
                  <TableCell>0.05 FNE</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="font-mono text-xs">0x1a2b...3c4d</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mar 7, 2025</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Reward
                    </div>
                  </TableCell>
                  <TableCell>#8734</TableCell>
                  <TableCell>0.03 FNE</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="font-mono text-xs">0x5e6f...7g8h</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mar 5, 2025</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Stake
                    </div>
                  </TableCell>
                  <TableCell>#5432</TableCell>
                  <TableCell>10.0 FNE</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="font-mono text-xs">0x9i0j...1k2l</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mar 1, 2025</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      Unstake
                    </div>
                  </TableCell>
                  <TableCell>#1289</TableCell>
                  <TableCell>5.0 FNE</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="font-mono text-xs">0x3m4n...5o6p</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Feb 28, 2025</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Reward
                    </div>
                  </TableCell>
                  <TableCell>#1289</TableCell>
                  <TableCell>0.04 FNE</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="font-mono text-xs">0x7q8r...9s0t</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Feb 25, 2025</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Stake
                    </div>
                  </TableCell>
                  <TableCell>#8734</TableCell>
                  <TableCell>32.0 FNE</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="font-mono text-xs">0x1u2v...3w4x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Feb 20, 2025</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Stake
                    </div>
                  </TableCell>
                  <TableCell>#1289</TableCell>
                  <TableCell>55.0 FNE</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="font-mono text-xs">0x5y6z...7a8b</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

