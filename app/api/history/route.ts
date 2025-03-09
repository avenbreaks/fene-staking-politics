import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get the address from the query parameters
  const { searchParams } = new URL(request.url)
  const address = searchParams.get("address")

  if (!address) {
    return NextResponse.json({ error: "Address parameter is required" }, { status: 400 })
  }

  // In a real implementation, this would:
  // 1. Connect to the blockchain or indexer
  // 2. Query for transaction history associated with the address
  // 3. Return the transaction data

  // Mock transaction history
  const transactions = [
    {
      type: "reward",
      validatorId: 1289,
      amount: 0.05,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      transactionHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      status: "completed",
    },
    {
      type: "reward",
      validatorId: 8734,
      amount: 0.03,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      transactionHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x",
      status: "completed",
    },
    {
      type: "stake",
      validatorId: 5432,
      amount: 10.0,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      transactionHash: "0x9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b",
      status: "completed",
    },
    {
      type: "unstake",
      validatorId: 1289,
      amount: 5.0,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      transactionHash: "0x3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
      status: "completed",
    },
    {
      type: "reward",
      validatorId: 1289,
      amount: 0.04,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      transactionHash: "0x7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j",
      status: "completed",
    },
    {
      type: "stake",
      validatorId: 8734,
      amount: 32.0,
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      transactionHash: "0x1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n",
      status: "completed",
    },
    {
      type: "stake",
      validatorId: 1289,
      amount: 55.0,
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      transactionHash: "0x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r",
      status: "completed",
    },
  ]

  return NextResponse.json({
    address,
    transactions,
    totalTransactions: transactions.length,
    lastUpdated: new Date().toISOString(),
  })
}

