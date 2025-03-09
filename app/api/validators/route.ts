import { NextResponse } from "next/server"

// This would connect to your blockchain node or indexer in production
export async function GET() {
  // Mock data for validators
  const validators = [
    {
      id: 1289,
      address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      totalStaked: 128.5,
      apr: 4.5,
      status: "active",
      delegators: 24,
    },
    {
      id: 8734,
      address: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w",
      totalStaked: 96.2,
      apr: 4.2,
      status: "active",
      delegators: 18,
    },
    {
      id: 5432,
      address: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
      totalStaked: 64.0,
      apr: 4.7,
      status: "active",
      delegators: 12,
    },
    {
      id: 9876,
      address: "0xj1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0",
      totalStaked: 48.3,
      apr: 4.3,
      status: "active",
      delegators: 9,
    },
    {
      id: 2468,
      address: "0xn4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3",
      totalStaked: 32.0,
      apr: 4.1,
      status: "pending",
      delegators: 1,
    },
  ]

  return NextResponse.json({ validators })
}

