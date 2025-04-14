import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const research = await db.collection('research').findOne({
      _id: new ObjectId(params.id),
    });
    
    if (!research) {
      return NextResponse.json(
        { error: 'Research topic not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(research);
  } catch (error) {
    console.error('Error fetching research topic:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research topic' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const research = await request.json();
    const { id } = params;

    const result = await db.collection('research').updateOne(
      { _id: new ObjectId(id) },
      { $set: research }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Research topic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating research topic:', error);
    return NextResponse.json(
      { error: 'Failed to update research topic' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const { id } = params;

    const result = await db.collection('research').deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Research topic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting research topic:', error);
    return NextResponse.json(
      { error: 'Failed to delete research topic' },
      { status: 500 }
    );
  }
} 