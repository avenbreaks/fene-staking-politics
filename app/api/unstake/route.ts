import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { validatorId, amount, address } = await request.json()

    // Validate input
    if (!validatorId || !amount || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (amount < 0.1) {
      return NextResponse.json({ error: "Minimum unstake amount is 0.1 FNE" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Connect to the blockchain
    // 2. Submit an unstaking transaction
    // 3. Wait for confirmation
    // 4. Return the transaction details

    // Mock successful response
    return NextResponse.json({
      success: true,
      transaction: {
        hash: "0x" + Math.random().toString(16).substring(2, 42),
        validatorId,
        amount,
        address,
        timestamp: new Date().toISOString(),
        type: "unstake",
        estimatedUnlockTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      },
    })
  } catch (error) {
    console.error("Error processing unstake request:", error)
    return NextResponse.json({ error: "Failed to process unstaking request" }, { status: 500 })
  }
}

