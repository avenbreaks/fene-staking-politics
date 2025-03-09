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
  // 2. Query for rewards associated with the address
  // 3. Return the rewards data

  // Mock rewards data
  const rewards = [
    {
      validatorId: 1289,
      amount: 0.05,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      transactionHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    },
    {
      validatorId: 8734,
      amount: 0.03,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      transactionHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x",
    },
    {
      validatorId: 1289,
      amount: 0.04,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      transactionHash: "0x7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j",
    },
  ]

  // Calculate total rewards
  const totalRewards = rewards.reduce((sum, reward) => sum + reward.amount, 0)

  return NextResponse.json({
    address,
    rewards,
    totalRewards,
    lastUpdated: new Date().toISOString(),
  })
}

