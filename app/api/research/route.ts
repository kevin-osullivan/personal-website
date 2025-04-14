import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const research = await db.collection('research').find({}).toArray();
    return NextResponse.json(research);
  } catch (error) {
    console.error('Error fetching research:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const research = await request.json();
    
    const result = await db.collection('research').insertOne({
      ...research,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating research:', error);
    return NextResponse.json(
      { error: 'Failed to create research' },
      { status: 500 }
    );
  }
}