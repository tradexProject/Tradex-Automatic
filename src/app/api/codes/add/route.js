import { NextResponse } from 'next/server';
import { verifyAdmin } from '../../../../backend/utils/verifyToken';
import { Code } from '../../../../backend/models/code';

export async function POST(req) {
  const auth = verifyAdmin(req);
  if (!auth.success) {
    return NextResponse.json({ error: "Action unauthorized on TradeX system" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { codes, planName } = body;

    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json({ error: 'No codes were provided' }, { status: 400 });
    }

    if (!planName) {
      return NextResponse.json({ error: 'Plan name is required' }, { status: 400 });
    }

    const dataToInsert = codes.map(codeStr => ({
      activationCode: codeStr,
      planName: planName,
      isUsed: false
    }));

    const createdCodes = await Code.bulkCreate(dataToInsert, {
      ignoreDuplicates: true,
      returning: true 
    });

    const addedCount = createdCodes.filter(c => c.id).length;
    const skippedCount = codes.length - addedCount;

    if (addedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "All provided codes already exist in TradeX inventory." 
      }, { status: 409 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully added ${addedCount} codes.`,
      details: skippedCount > 0 ? `${skippedCount} duplicate codes were skipped.` : null
    }, { status: 200 });

  } catch (error) {
    console.error("TradeX Error adding codes:", error);
    return NextResponse.json({ error: 'Internal server error while adding codes' }, { status: 500 });
  }
}