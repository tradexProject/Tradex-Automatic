import { NextResponse } from 'next/server';
import { verifyAdmin } from '../../../backend/utils/verifyToken';
import { Code } from '../../../backend/models/code';
import { SubscriptionRequest } from '../../../backend/models/subscriptionRequest';

export async function GET(req) {
  const auth = verifyAdmin(req);
  if (!auth.success) {
    return NextResponse.json({ error: "Unauthorized access to TradeX console" }, { status: 401 });
  }

  try {
    const requests = await SubscriptionRequest.findAll({ order: [['createdAt', 'DESC']] });
    
    const allCodes = await Code.findAll({ 
      raw: true, 
      order: [['createdAt', 'DESC']] 
    });
    
    const formattedCodes = allCodes.map(c => ({
      id: c.id,
      code: c.activationCode, 
      planName: c.planName,
      isUsed: c.isUsed,
      usedBy: c.usedBy || null
    }));

    const pendingCount = await SubscriptionRequest.count({ where: { status: 'pending' } });
    const activeCount = await SubscriptionRequest.count({ where: { status: 'approved' } });
    const availableCodesCount = await Code.count({ where: { isUsed: false } });

    return NextResponse.json({
      requests,
      stats: {
        pending: pendingCount,
        active: activeCount,
        availableCodes: availableCodesCount
      },
      codes: formattedCodes
    }, { status: 200 });

  } catch (error) {
    console.error("TradeX Dashboard Fetch Error:", error);
    return NextResponse.json({ error: "TradeX server error occurred while fetching data" }, { status: 500 });
  }
}